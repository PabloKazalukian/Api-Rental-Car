import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { PaymentEntity } from "../entities/payment.entity";
import { PaymentDTO } from "../dtos/payment.dto";

export class PaymentService extends BaseService<PaymentEntity> {
    constructor() {
        super(PaymentEntity);
    }

    async findAllPayment(): Promise<PaymentEntity[]> {
        return (await this.execRepository).find();
    }
    async findById(id: string): Promise<PaymentEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }
    async createPayment(newPayment: PaymentDTO): Promise<PaymentEntity> {
        return (await this.execRepository).save(newPayment)

    }
    async deletePayment(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updatePayment(id: string, infoUpdate: PaymentDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }
}