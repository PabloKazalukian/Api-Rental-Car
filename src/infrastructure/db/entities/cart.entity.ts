import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../../config/base.entity';
import { RequestEntity } from './request.entity';

@Entity({ name: 'cart' })
export class CartEntity extends BaseEntity {
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user' })
    user!: UserEntity;

    @Column('uuid', { array: true, default: [] }) // 🔑 guarda solo IDs
    requests!: string[];
}
