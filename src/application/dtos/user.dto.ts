import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserType } from "../../domain/entities/user.entity";

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