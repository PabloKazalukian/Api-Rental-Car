import { DeleteResult, UpdateResult } from "typeorm";
import { UserDiscountEntity } from "../../db/entities/user-discount.entity";
import { BaseService } from "../../base.service";
import { CreateUserDiscountDTO, UserDiscountDTO } from "../../../application/dtos/user-discount.dto";
import { UserDiscount } from "../../../domain/entities/user-discount";
import { IUserDiscountRepository } from "../../../domain/interface/repositories/user-discount-repository.interface";

export class UserDiscountRepository extends BaseService<UserDiscountEntity> implements IUserDiscountRepository {
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

    async createUserDiscount(newDiscount: UserDiscountEntity): Promise<UserDiscountEntity> {
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