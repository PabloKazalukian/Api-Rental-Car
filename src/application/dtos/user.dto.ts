import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../infrastructure/config/base.dto";
import { UserType } from "../../infrastructure/db/entities/user.entity";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsEnum(UserType)
    type?: UserType;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    // @OneToMany(() => RequestEntity, (request) => request.createBy)
    // requests!: RequestEntity[];

}

export class CreateUserDTO {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsEnum(UserType)
    type?: UserType;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    // @OneToMany(() => RequestEntity, (request) => request.createBy)
    // requests!: RequestEntity[];

}

