import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { RequestEntity } from "./request.entity";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "./user.entity";

export enum DiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
}

@Entity({ name: "discount" })
export class DiscountEntity extends BaseEntity {

    @Column()
    codeDiscount!: string;

    @Column()
    initialDate!: Date;

    @Column()
    expirationDate!: Date;

    @Column({ type: 'enum', enum: DiscountType })
    type!: DiscountType;

    @Column({ type: 'float', nullable: true })
    percentage?: number;

    @Column({ type: 'float', nullable: true })
    amount?: number;

    @Column()
    status!: boolean;

    @ManyToMany(() => UserEntity, (user) => user.discounts)
    @JoinTable()
    users!: UserEntity[]

    @ManyToOne(() => RequestEntity, (request) => request.discount_id, { nullable: true })
    @JoinColumn({ name: "request_id" })
    request_id!: RequestEntity;

}