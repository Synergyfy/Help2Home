import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsEnum } from 'class-validator';

export class CreatePropertyDto {
    @ApiProperty({ example: 'Beautiful 3 Bedroom Apartment' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'A spacious and well-lit apartment in the heart of the city.' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'rent', enum: ['rent', 'buy', 'service-apartment'] })
    @IsString()
    propertyType: string;

    @ApiProperty({ example: 'Apartment' })
    @IsString()
    category: string;

    @ApiProperty({ example: '123 Main St' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'Lagos Island' })
    @IsString()
    location: string;

    @ApiProperty({ example: 'Lagos' })
    @IsString()
    city: string;

    @ApiProperty({ example: 'Lagos State' })
    @IsString()
    state: string;

    @ApiPropertyOptional({ example: '100001' })
    @IsOptional()
    @IsString()
    postcode?: string;

    @ApiProperty({ example: ['https://example.com/image1.jpg'] })
    @IsArray()
    @IsString({ each: true })
    images: string[];

    @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=...' })
    @IsOptional()
    @IsString()
    videoUrl?: string;

    @ApiPropertyOptional({ example: 'https://example.com/floorplan.jpg' })
    @IsOptional()
    @IsString()
    floorPlanUrl?: string;

    @ApiProperty({ example: 3 })
    @IsNumber()
    bedrooms: number;

    @ApiProperty({ example: 2 })
    @IsNumber()
    bathrooms: number;

    @ApiPropertyOptional({ example: 120.5 })
    @IsOptional()
    @IsNumber()
    floorSize?: number;

    @ApiPropertyOptional({ example: ['Pool', 'Gym'] })
    @IsOptional()
    @IsArray()
    amenities?: any[];

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    furnished?: boolean;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    parking?: boolean;

    @ApiProperty({ example: 500000 })
    @IsNumber()
    price: number;

    @ApiPropertyOptional({ example: 45000 })
    @IsOptional()
    @IsNumber()
    monthlyPrice?: number;

    @ApiPropertyOptional({ example: 100000 })
    @IsOptional()
    @IsNumber()
    deposit?: number;

    @ApiPropertyOptional({ example: 5000 })
    @IsOptional()
    @IsNumber()
    fees?: number;

    @ApiPropertyOptional({ example: 'NGN' })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    isInstallmentAllowed?: boolean;

    @ApiPropertyOptional({ example: 20000 })
    @IsOptional()
    @IsNumber()
    serviceCharge?: number;

    @ApiPropertyOptional({ example: 'landlord', enum: ['landlord', 'agent'] })
    @IsOptional()
    @IsString()
    posterRole?: string;

    @ApiPropertyOptional({ example: 'freehold' })
    @IsOptional()
    @IsString()
    ownership?: string;
}
