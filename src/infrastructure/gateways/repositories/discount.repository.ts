import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../base.service";
import { DiscountDTO } from "../../../application/dtos/discount.dto";
import { DiscountEntity } from "../../db/entities/discount.entity";

export class DiscountRepository extends BaseService<DiscountEntity> {
    constructor() {
        super(DiscountEntity);
    }

    async findAllDiscount(): Promise<DiscountEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }

    async findById(id: string): Promise<DiscountEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id });
    }

    async createDiscount(newDiscount: DiscountDTO): Promise<DiscountEntity> {
        const repo = await this.execRepository();
        return repo.save(newDiscount);
    }

    async deleteDiscount(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository();
        return repo.delete({ id });
    }

    async updateDiscount(id: string, infoUpdate: DiscountDTO): Promise<UpdateResult> {
        const repo = await this.execRepository();
        return repo.update(id, infoUpdate);
    }
}