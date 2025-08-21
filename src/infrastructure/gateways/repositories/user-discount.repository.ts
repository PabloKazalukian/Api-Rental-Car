import { DeleteResult, UpdateResult } from "typeorm";
import { UserDiscountEntity } from "../../../domain/entities/user-discount.entity";
import { BaseService } from "../../base.service";
import { UserDiscountDTO } from "../../../application/dtos/user-discount.dto";

export class UserDiscountRepository extends BaseService<UserDiscountEntity> {
    constructor() {
        super(UserDiscountEntity);
    }

    async findAllUserDiscount(): Promise<UserDiscountEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }

    async findById(id: string): Promise<UserDiscountEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id });
    }

    async createUserDiscount(newDiscount: UserDiscountDTO): Promise<UserDiscountEntity> {
        const repo = await this.execRepository();
        return repo.save(newDiscount);
    }

    async deleteUserDiscount(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository();
        return repo.delete({ id });
    }

    async updateUserDiscount(id: string, infoUpdate: UserDiscountDTO): Promise<UpdateResult> {
        const repo = await this.execRepository();
        return repo.update(id, infoUpdate);
    }

}