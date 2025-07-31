import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { PaymentEntity } from "../entities/payment.entity";
import { PaymentDTO } from "../dtos/payment.dto";

export class PaymentService extends BaseService<PaymentEntity> {
    constructor() {
        super(PaymentEntity);
    }

    async findAllPayment(): Promise<PaymentEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }
    async findById(id: string): Promise<PaymentEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id })
    }
    async createPayment(newPayment: PaymentDTO): Promise<PaymentEntity> {
        const repo = await this.execRepository();
        return repo.save(newPayment)

    }
    async deletePayment(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository();
        return repo.delete({ id })
    }
    async updatePayment(id: string, infoUpdate: PaymentDTO): Promise<UpdateResult> {
        const repo = await this.execRepository();
        return repo.update(id, infoUpdate)
    }
}