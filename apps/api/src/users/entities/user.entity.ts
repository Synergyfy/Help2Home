import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../common/enums/role.enum';

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    phone: string;

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.TENANT],
    })
    roles: Role[];

    @Column({ default: false })
    verified: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'varchar', nullable: true, select: false })
    refreshToken: string | null;

    @Column({ nullable: true })
    migrationTest: string;

    @Column({ default: false })
    phoneNumberVerified: boolean;
}
