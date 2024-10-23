import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { DiscountEntity } from "../entities/discount.entity";
import { DiscountDTO } from "../dto/discount.dto";

export class DiscountService extends BaseService<DiscountEntity> {
    constructor() {
        super(DiscountEntity);
    }

    async findAllDiscount(): Promise<DiscountEntity[]> {
        return (await this.execRepository).find();
    }

    async findById(id: string): Promise<DiscountEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async createDiscount(newDiscount: DiscountDTO): Promise<DiscountEntity> {
        return (await this.execRepository).save(newDiscount);
    }

    async deleteDiscount(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updateDiscount(id: string, infoUpdate: DiscountDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}