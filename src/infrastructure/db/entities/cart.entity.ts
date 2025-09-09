import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from '../../config/base.entity';
import { RequestEntity } from './request.entity';

@Entity({ name: 'cart' })
export class CartEntity extends BaseEntity {
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;

    @OneToMany(() => RequestEntity, (request) => request.cart)
    checkout!: RequestEntity[];
}
