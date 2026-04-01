import { ApiProperty } from '@nestjs/swagger';

export class PropertyResponseDto {
    @ApiProperty({ example: 'uuid-string' })
    id: string;

    @ApiProperty({ example: 'Beautiful 3 Bedroom Apartment' })
    title: string;

    @ApiProperty({ example: 'A spacious and well-lit apartment in the heart of the city.' })
    description: string;

    @ApiProperty({ example: 'rent' })
    propertyType: string;

    @ApiProperty({ example: 'Apartment' })
    category: string;

    @ApiProperty({ example: '123 Main St' })
    address: string;

    @ApiProperty({ example: 'Lagos' })
    city: string;

    @ApiProperty({ example: 'Lagos State' })
    state: string;

    @ApiProperty({ example: 500000 })
    price: number;

    @ApiProperty({ example: 'NGN' })
    currency: string;

    @ApiProperty({ example: 3 })
    bedrooms: number;

    @ApiProperty({ example: 2 })
    bathrooms: number;

    @ApiProperty({ example: ['https://example.com/image1.jpg'] })
    images: string[];

    @ApiProperty({ example: 'available' })
    status: string;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    createdAt: Date;
}
