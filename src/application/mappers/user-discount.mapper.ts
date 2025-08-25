// infrastructure/db/mappers/user-discount.mapper.ts

import { UserDiscount } from "../../domain/entities/user-discount";
import { UserDiscountEntity } from "../../infrastructure/db/entities/user-discount.entity";

export class UserDiscountMapper {
    static toDomain(entity: UserDiscountEntity): UserDiscount {
        return new UserDiscount(
            entity.id,
            entity.requestedDate,
            entity.issueDate,
            entity.user = { id: entity.user.id } as any,
            entity.discount = { id: entity.discount.id } as any,
            entity.payment = entity.payment ? { id: entity.payment.id } as any : null,
            entity.status
        );
    }

    static toPersistence(discount: UserDiscount): UserDiscountEntity {
        const entity = new UserDiscountEntity();
        entity.id = discount.id;
        entity.requestedDate = discount.requestedDate;
        entity.issueDate = discount.issueDate;
        entity.status = discount.status;
        entity.user = { id: discount.user.id } as any;
        entity.discount = { id: discount.discount.id } as any;
        entity.payment = discount.payment ? { id: discount.payment } as any : null;

        // OJO: acá hay que setear relaciones por id → en repositorio, no en mapper

        return entity;
    }
}
