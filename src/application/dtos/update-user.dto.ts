import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "./user.dto";
import { UserType } from "../../domain/entities/user.entity";

export class UpdateUserDTO {
    @IsOptional()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    password?: string; // según la lógica, puede estar bloqueado

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    @IsEnum(UserType)
    type?: UserType;
}
