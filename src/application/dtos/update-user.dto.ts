import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { UserRole, UserType } from "../../domain/entities/user";

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
