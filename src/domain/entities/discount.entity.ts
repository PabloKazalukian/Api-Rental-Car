import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { RequestEntity } from "./request.entity";
import { BaseEntity } from "../../infrastructure/config/base.entity";
import { UserEntity } from "./user.entity";
import { PaymentEntity } from "./payment.entity";
import { UserDiscountEntity } from "./user-discount.entity";

export enum DiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
}

@Entity({ name: "discount" })
export class DiscountEntity extends BaseEntity {

    @Column()
    @Index()
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

    @OneToMany(() => UserDiscountEntity, (userDiscount) => userDiscount.discount)
    userDiscounts!: UserDiscountEntity[];


}