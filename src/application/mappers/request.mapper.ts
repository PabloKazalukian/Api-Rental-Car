import { Request } from '../../domain/entities/request';
import { RequestEntity } from '../../infrastructure/db/entities/request.entity';

export class RequestMapper {
    static toDomain(entity: RequestEntity): Request {
        return new Request(
            entity.id,
            entity.amount,
            entity.initialDate,
            entity.finalDate,
            entity.state,
            (entity.user_id = { id: entity.user_id } as any),
            (entity.car_id = { id: entity.car_id } as any),
            (entity.requestPayment = { id: entity.requestPayment.id } as any)
        );
    }

    static toPersistence(request: Request): RequestEntity {
        const entity = new RequestEntity();
        entity.id = request.id;
        entity.amount = request.amount;
        entity.initialDate = request.initialDate;
        entity.finalDate = request.finalDate;
        entity.state = request.state;
        entity.user_id = { id: request.user.id } as any;
        entity.car_id = { id: request.car.id } as any;
        entity.requestPayment = request.payments ? ({ id: request.payments } as any) : null;

        return entity;
    }
}
