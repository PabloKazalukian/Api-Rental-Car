import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../infrastructure/config/base.dto";
import { UserRole, UserType } from "../../domain/entities/user";
import { RequestEntity } from "../../infrastructure/db/entities/request.entity";


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

    @IsOptional()
    requests!: RequestEntity;

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

    @IsOptional()
    requests!: RequestEntity;

    // @OneToMany(() => RequestEntity, (request) => request.createBy)
    // requests!: RequestEntity[];

}

