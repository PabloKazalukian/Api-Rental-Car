import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { RequestEntity } from "./request.entity";
import { BaseEntity } from "../config/base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "discount" })
export class DiscountEntity extends BaseEntity {

    @Column()
    codeDiscount!: string;

    @Column()
    initialDate!: string;

    @Column()
    expirationDate!: string;

    @Column()
    percentage!: number;

    @Column()
    status!: boolean;

    @ManyToMany(() => UserEntity, (user) => user.discounts)
    @JoinTable()
    users!: UserEntity[]

    @ManyToOne(() => RequestEntity, (request) => request.discount_id, { nullable: true })
    @JoinColumn({ name: "request_id" })
    request_id!: RequestEntity;

}