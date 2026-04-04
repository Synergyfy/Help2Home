import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../../contract/entities/contract.entity';
import { ContractTemplate } from '../../../contract/entities/contract-template.entity';

@Injectable()
export class LandlordContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(ContractTemplate)
    private readonly templateRepository: Repository<ContractTemplate>,
  ) {}

  async getTemplates() {
    return this.templateRepository.find({
      where: { isActive: true },
    });
  }

  async getContracts(landlordId: string) {
    return this.contractRepository.find({
      where: { landlordId },
      order: { createdAt: 'DESC' },
    });
  }

  async getContractDetails(landlordId: string, id: string) {
    const contract = await this.contractRepository.findOne({
      where: { id, landlordId },
    });
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }

  async createContract(landlordId: string, data: Partial<Contract>) {
    const contract = this.contractRepository.create({
      ...data,
      landlordId,
      createdBy: landlordId,
      status: 'Draft',
    });
    return this.contractRepository.save(contract);
  }

  async updateContractStatus(landlordId: string, id: string, status: string) {
    const contract = await this.getContractDetails(landlordId, id);
    contract.status = status;
    return this.contractRepository.save(contract);
  }

  // Other operations like update signer status, sign contract, etc., can be added here
}
