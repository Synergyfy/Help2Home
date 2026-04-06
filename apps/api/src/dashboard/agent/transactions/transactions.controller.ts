import { Controller, Get, UseGuards, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { GetCurrentUser } from '../../../common/decorators/get-current-user.decorator';
import { TransactionService } from './transactions.service';

@ApiTags('agent/transactions')
@Controller('dashboard/agent/transactions')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.AGENT)
@ApiBearerAuth()
export class AgentTransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('commissions')
  @ApiOperation({ summary: 'Get agent commission history' })
  @ApiResponse({ status: 200, description: 'Commission history list' })
  async getCommissions(@GetCurrentUser('sub') agentId: string) {
    return this.transactionService.findAllByAgent(agentId);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get earnings summary' })
  async getSummary(@GetCurrentUser('sub') agentId: string) {
    return this.transactionService.findSummary(agentId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a transaction record (Internal)' })
  async create(@GetCurrentUser('sub') agentId: string, @Body() data: any) {
    return this.transactionService.create({ ...data, agentId });
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update transaction status' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.transactionService.updateStatus(id, status);
  }
}
