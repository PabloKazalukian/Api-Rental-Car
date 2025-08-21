import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { DiscountEntity } from "./discount.entity";
import { PaymentEntity } from "./payment.entity";
import { IsDate, IsNotEmpty } from "class-validator";
import { BaseEntity } from "../../config/base.entity";

export enum UserDiscountStatus {
    AVAILABLE = "available",
    USED = "used",
    EXPIRED = "expired"
}

@Entity({ name: "user_discount" })
export class UserDiscountEntity extends BaseEntity {

    @Column()
    @Index()
    requestedDate!: Date;

    @Column()
    @Index()
    issueDate!: Date;

    @ManyToOne(() => UserEntity, (user) => user.discounts, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    @ManyToOne(() => DiscountEntity, { nullable: false })
    @JoinColumn({ name: "discount_id" })
    discount!: DiscountEntity;

    @OneToOne(() => PaymentEntity, { nullable: true })
    @JoinColumn({ name: "payment_id" })
    payment!: PaymentEntity | null;

    @Column({
        type: "enum",
        enum: UserDiscountStatus,
        default: UserDiscountStatus.AVAILABLE
    })
    status!: UserDiscountStatus;

}
