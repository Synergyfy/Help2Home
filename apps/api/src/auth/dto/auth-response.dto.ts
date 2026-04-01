import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';

export class UserResponseDto {
    @ApiProperty({ example: 'uuid-string' })
    id: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: 'John' })
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    lastName: string;

    @ApiProperty({ example: '+1234567890', nullable: true })
    phone: string | null;

    @ApiProperty({ enum: Role, isArray: true, example: [Role.TENANT] })
    roles: Role[];

    @ApiProperty({ example: false })
    verified: boolean;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
    updatedAt: Date;
}

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni...' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni...' })
    refreshToken: string;

    @ApiProperty({ type: UserResponseDto })
    user: UserResponseDto;
}

export class RefreshResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni...' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni...' })
    refreshToken: string;
}
