import { IsDate, IsOptional, IsUUID } from "class-validator";

export class BaseDto {

    @IsUUID()
    @IsOptional()
    id!: string;

    @IsDate()
    @IsOptional()
    createdAd!: Date;

    @IsDate()
    @IsOptional()
    UpdatedAd!: Date;
}
