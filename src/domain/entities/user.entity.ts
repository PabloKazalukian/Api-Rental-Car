import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { RequestEntity } from "./request.entity";
import { Exclude } from "class-transformer";
import { DiscountEntity } from "./discount.entity";
import { BaseEntity } from "../../config/base.entity";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export enum UserType {
    LOCAL = "local",
    GOOGLE = "google",
    GITHUB = "github",
    MICROSOFT = "microsoft"
}

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

    @ManyToMany(() => DiscountEntity, (discount) => discount.users)
    discounts!: DiscountEntity[];

}