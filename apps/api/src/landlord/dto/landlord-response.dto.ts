import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../auth/dto/auth-response.dto';

export class StatItemDto {
    @ApiProperty({ example: 'total-properties' })
    id: string;

    @ApiProperty({ example: 'Total Properties' })
    label: string;

    @ApiProperty({ example: '10' })
    value: string;

    @ApiProperty({ example: 'Active listings' })
    subtitle: string;

    @ApiProperty({ example: 'up', enum: ['up', 'down', 'neutral'] })
    trend: string;

    @ApiProperty({ example: '12%' })
    trendValue: string;

    @ApiProperty({ example: 'success', enum: ['success', 'error', 'neutral', 'warning'] })
    status: string;
}

export class TaskDto {
    @ApiProperty({ example: '1' })
    id: string;

    @ApiProperty({ example: 'Complete your profile' })
    title: string;

    @ApiProperty({ example: 'Add your bank details to receive payments' })
    description: string;

    @ApiProperty({ example: 'high', enum: ['high', 'medium', 'low'] })
    priority: string;

    @ApiProperty({ example: 'ASAP' })
    dueDate: string;

    @ApiProperty({ example: 'Profile' })
    category: string;
}

export class VerificationDto {
    @ApiProperty({ example: 'identity' })
    id: string;

    @ApiProperty({ example: 'Identity Verification' })
    name: string;

    @ApiProperty({ example: 'pending', enum: ['pending', 'verified', 'not_started', 'failed'] })
    status: string;

    @ApiProperty({ example: 'User' })
    icon: string;
}

export class DashboardStatsResponseDto {
    @ApiProperty({ type: [StatItemDto] })
    summary: StatItemDto[];

    @ApiProperty({ type: [TaskDto] })
    tasks: TaskDto[];

    @ApiProperty({ type: [Object], example: [] })
    payments: any[];

    @ApiProperty({ type: [VerificationDto] })
    verification: VerificationDto[];

    @ApiProperty({ type: [Object], example: [] })
    activities: any[];
}

export class LandlordProfileDataDto extends UserResponseDto {
    @ApiProperty({ example: null, nullable: true })
    avatar: string | null;

    @ApiProperty({ example: '' })
    address: string;

    @ApiProperty({ example: '' })
    bio: string;
}

export class ProfileResponseDto {
    @ApiProperty({ type: LandlordProfileDataDto })
    data: LandlordProfileDataDto;
}
