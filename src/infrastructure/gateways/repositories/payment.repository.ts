import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../base.service";
import { PaymentDTO } from "../../../application/dtos/payment.dto";
import { PaymentEntity } from "../../db/entities/payment.entity";
import { IPaymentRepository } from "../../../domain/interface/repositories/payment-repository.interface";

export class PaymentRepository extends BaseService<PaymentEntity> implements IPaymentRepository {
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