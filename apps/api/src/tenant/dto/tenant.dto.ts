import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '08012345678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tenantId?: string;

  @ApiProperty({ example: 'Sunset Villa' })
  @IsString()
  propertyName: string;

  @ApiProperty({ example: 'prop-123' })
  @IsString()
  propertyId: string;

  @ApiPropertyOptional({ example: 'Active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'Up to date' })
  @IsString()
  @IsOptional()
  paymentStatus?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  monthlyRentAmount?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dateLeaseStart?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsString()
  @IsOptional()
  leaseEnd?: string;

  @ApiPropertyOptional()
  @IsOptional()
  details?: any;
}

export class UpdateTenantDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  propertyName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  propertyId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentStatus?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  leaseEnd?: string;

  @ApiPropertyOptional()
  @IsOptional()
  details?: any;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  monthlyRentAmount?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dateLeaseStart?: string;
}

export class TenantResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  propertyName: string;

  @ApiProperty()
  propertyId: string;

  @ApiProperty()
  landlordId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  paymentStatus: string;

  @ApiProperty()
  leaseEnd: string;

  @ApiProperty()
  createdAt: Date;
}
