import { BaseDTO } from "../../config/base.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { SpecificationsCarDTO } from "./carSpecifications.dto";

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