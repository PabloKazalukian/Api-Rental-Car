import { Payment } from '../../domain/entities/payment';
import { PaymentEntity } from '../../infrastructure/db/entities/payment.entity';

export class PaymentMapper {
    static toDomain(entity: PaymentEntity): Payment {
        return new Payment(
            entity.id,
            entity.paidDate,
            entity.createdDate,
            entity.automatic,
            (entity.request_id = { id: entity.request_id } as any),
            entity.userDiscount ? ({ id: entity.userDiscount.id } as any) : null
        );
    }

    static toPersistence(payment: Payment): PaymentEntity {
        const entity = new PaymentEntity();
        entity.id = payment.id;
        entity.paidDate = payment.paidDate;
        entity.createdDate = payment.createdDate;
        entity.automatic = payment.automatic;
        entity.request_id = payment.request.id as any;
        entity.userDiscount = payment.userDiscount?.id || (null as any);

        return entity;
    }
}
