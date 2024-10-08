import { IsNotEmpty } from "class-validator";
import { BaseDto } from "../config/base.dto";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export class UserDTO extends BaseDto {

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    role!: UserRole;

    // @OneToMany(() => RequestEntity, (request) => request.createBy)
    // requests!: RequestEntity[];

}