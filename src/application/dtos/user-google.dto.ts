import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UserGoogleDTO {

    @IsNotEmpty()
    id!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    name!: string;

    @IsOptional()
    picture?: string;

}
