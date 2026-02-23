import { DeleteResult, UpdateResult } from "typeorm";
import { PaymentDTO } from "../../../application/dtos/payment.dto";
import { PaymentEntity } from "../../../infrastructure/db/entities/payment.entity";

export interface IPaymentRepository {
    findAllPayment(): Promise<PaymentEntity[]>;
    findById(id: string): Promise<PaymentEntity | null>;
    createPayment(newPayment: PaymentDTO): Promise<PaymentEntity>;
    deletePayment(id: string): Promise<DeleteResult>;
    updatePayment(id: string, infoUpdate: PaymentDTO): Promise<UpdateResult>;
}
