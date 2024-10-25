import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { RequestEntity } from "./request.entity";
import { Exclude } from "class-transformer";
import { DiscountEntity } from "./discount.entity";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column({ unique: true })
    username!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @OneToMany(() => RequestEntity, (request) => request.user_id)
    requests!: RequestEntity[];

    @ManyToMany(() => DiscountEntity, (discount) => discount.users)
    discounts!: DiscountEntity[];

}