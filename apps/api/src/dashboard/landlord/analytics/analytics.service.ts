import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PaymentTransaction } from '../../../payment/entities/payment-transaction.entity';
import { Property } from '../../../property/entities/property.entity';
import { Maintenance } from '../../agent/maintenance/entities/maintenance.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private readonly paymentRepository: Repository<PaymentTransaction>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  async getLandlordAnalytics(landlordId: string) {
    const now = new Date();
    
    // 1. Income Data (Monthly for last 6 months)
    const incomeData: { name: string; total: number }[] = [];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      
      const transactions = await this.paymentRepository.find({
        where: {
          landlordId,
          status: 'Cleared',
          createdAt: Between(start, end),
        }
      });
      
      const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
      incomeData.push({
        name: monthsShort[start.getMonth()],
        total
      });
    }

    // 2. Occupancy Data
    const totalProperties = await this.propertyRepository.count({ where: { ownerId: landlordId } });
    const rentedProperties = await this.propertyRepository.count({ 
      where: { ownerId: landlordId, status: 'rented' } 
    });
    
    const occupancyData = [
      { name: 'Occupied', value: rentedProperties },
      { name: 'Vacant', value: totalProperties - rentedProperties },
    ];

    // 3. Maintenance Data (Monthly costs for last 6 months)
    const maintenanceData: { name: string; total: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      
      const requests = await this.maintenanceRepository.find({
        where: {
          landlordId,
          status: 'Resolved',
          createdAt: Between(start, end),
        }
      });
      
      const total = requests.reduce((sum, r) => sum + (Number(r.cost) || 0), 0);
      maintenanceData.push({
        name: monthsShort[start.getMonth()],
        total
      });
    }

    // 4. Summary Stats (KPIs)
    const currentMonthRevenue = incomeData[incomeData.length - 1]?.total || 0;
    const prevMonthRevenue = incomeData[incomeData.length - 2]?.total || 0;
    const revenueGrowth = prevMonthRevenue !== 0 ? ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 : 0;
    
    const totalRevenue = incomeData.reduce((sum, d) => sum + d.total, 0);

    return {
      incomeData,
      occupancyData,
      maintenanceData,
      summary: {
        totalRevenue: `₦${totalRevenue.toLocaleString()}`,
        revenueGrowth: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`,
        occupancyRate: totalProperties !== 0 ? `${((rentedProperties / totalProperties) * 100).toFixed(1)}%` : '0%',
        activeMaintenance: await this.maintenanceRepository.count({ 
          where: { landlordId, status: 'Pending' } 
        })
      }
    };
  }
}
