import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { RequestEntity } from "./request.entity";
import { Exclude } from "class-transformer";
import { BaseEntity } from "../../config/base.entity";
import { UserDiscountEntity } from "./user-discount.entity";
import { UserRole, UserType } from "../../../domain/entities/user";


@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column({ unique: true })
    username!: string;

    @Column()
    @Exclude()
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ type: "enum", enum: UserType, default: UserType.LOCAL })
    type!: UserType

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @OneToMany(() => RequestEntity, (request) => request.user_id)
    requests!: RequestEntity[];

    @OneToMany(() => UserDiscountEntity, (userDiscount) => userDiscount.user)
    discounts!: UserDiscountEntity[];

}