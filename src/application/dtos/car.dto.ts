import { BaseDTO } from "../../infrastructure/config/base.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { SpecificationsCarDTO } from "./car-specifications.dto";

export class CarDTO extends BaseDTO {

    @IsNotEmpty()
    image!: string;

    @IsNotEmpty()
    brand!: string;

    @IsNotEmpty()
    model!: string;

    @IsNotEmpty()
    year!: number;

    @IsNotEmpty()
    price!: number;

    @ValidateNested()
    specifications_car!: SpecificationsCarDTO;

}