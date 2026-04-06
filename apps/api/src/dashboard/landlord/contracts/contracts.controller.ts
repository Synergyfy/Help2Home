import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { LandlordContractsService } from './contracts.service';
import { Contract } from '../../../contract/entities/contract.entity';

@ApiTags('Landlord Contracts')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('dashboard/landlord/contracts')
export class LandlordContractsController {
  constructor(private readonly contractsService: LandlordContractsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contracts for the landlord' })
  async getContracts(@GetCurrentUser('sub') landlordId: string) {
    return this.contractsService.getContracts(landlordId);
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get all contract templates' })
  async getTemplates() {
    return this.contractsService.getTemplates();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  async createContract(
    @GetCurrentUser('sub') landlordId: string,
    @Body() data: Partial<Contract>
  ) {
    return this.contractsService.createContract(landlordId, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific contract' })
  async getContractDetails(
    @GetCurrentUser('sub') landlordId: string,
    @Param('id') id: string
  ) {
    return this.contractsService.getContractDetails(landlordId, id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update the status of a contract' })
  async updateContractStatus(
    @GetCurrentUser('sub') landlordId: string,
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.contractsService.updateContractStatus(landlordId, id, status);
  }
}
