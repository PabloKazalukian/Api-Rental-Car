import { IsEnum, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config/base.dto";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;

    // @OneToMany(() => RequestEntity, (request) => request.createBy)
    // requests!: RequestEntity[];

}