import { IsNotEmpty } from "class-validator";

export class SpecificationsCarDTO {

    @IsNotEmpty()
    engine!: string;

    @IsNotEmpty()
    power!: string;

    @IsNotEmpty()
    torque!: string;

    @IsNotEmpty()
    weight!: string;

    @IsNotEmpty()
    max_speed!: string;

    @IsNotEmpty()
    acceleration!: string;

    @IsNotEmpty()
    consumption!: string;
}