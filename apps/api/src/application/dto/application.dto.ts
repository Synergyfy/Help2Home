import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsUUID, IsObject } from 'class-validator';

export class UpdateApplicationStatusDto {
  @ApiProperty({ example: 'Approved', enum: ['Pending', 'Under Review', 'Approved', 'Rejected'] })
  @IsString()
  status: string;
}

export class ApplicationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  landlordId: string;

  @ApiProperty()
  propertyId: string;

  @ApiProperty()
  tenantName: string;

  @ApiProperty()
  tenantEmail: string;

  @ApiProperty()
  tenantPhone: string;

  @ApiProperty()
  propertyTitle: string;

  @ApiProperty()
  propertyImage: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  details: any;

  @ApiProperty()
  financing: any;

  @ApiProperty()
  submittedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
