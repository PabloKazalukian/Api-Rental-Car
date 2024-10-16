import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { RequestEntity } from "./request.entity";
import { Exclude } from "class-transformer";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {

    @Column()
    username!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @OneToMany(() => RequestEntity, (request) => request.user_id)
    requests!: RequestEntity[];

}