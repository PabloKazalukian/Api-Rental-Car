import { DeleteResult, UpdateResult } from "typeorm";
import { DiscountDTO } from "../../../application/dtos/discount.dto";
import { DiscountEntity } from "../../../infrastructure/db/entities/discount.entity";

export interface IDiscountRepository {
    findAllDiscount(): Promise<DiscountEntity[]>;
    findById(id: string): Promise<DiscountEntity | null>;
    createDiscount(newDiscount: DiscountDTO): Promise<DiscountEntity>;
    deleteDiscount(id: string): Promise<DeleteResult>;
    updateDiscount(id: string, infoUpdate: DiscountDTO): Promise<UpdateResult>;
}
