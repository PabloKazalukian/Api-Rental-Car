import { Column, Entity, Index, JoinColumn, OneToMany } from "typeorm";
import { UserDiscountEntity } from "./user-discount.entity";
import { BaseEntity } from "../../config/base.entity";
import { DiscountType } from "../../../domain/entities/discount";



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

    @Column({ type: 'float', nullable: true, default: 0 })
    percentage?: number;

    @Column({ type: 'float', nullable: true, default: 0 })
    amount?: number;

    @Column()
    status!: boolean;

    @OneToMany(() => UserDiscountEntity, (userDiscount) => userDiscount.discount)
    @JoinColumn({ name: "user_discount_id" })
    userDiscounts!: UserDiscountEntity[];


}