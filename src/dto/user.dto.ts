import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config/base.dto";
import { Unique } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    // @OneToMany(() => RequestEntity, (request) => request.createBy)
    // requests!: RequestEntity[];

}