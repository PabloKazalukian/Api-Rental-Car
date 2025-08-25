import { Discount } from "../../domain/entities/discount";
import { DiscountEntity } from "../../infrastructure/db/entities/discount.entity";
import { UserDiscountMapper } from "./user-discount.mapper";

export class DiscountMapper {
    static toPersistence(discount: Discount): DiscountEntity {
        const entity = new DiscountEntity();
        entity.id = discount.id;
        entity.codeDiscount = discount.codeDiscount;
        entity.initialDate = discount.initialDate;
        entity.expirationDate = discount.expirationDate;
        entity.amount = discount.amount;
        entity.percentage = discount.percentage;
        entity.status = discount.status;
        entity.type = discount.type;
        entity.userDiscounts = discount.userDiscounts?.map(ud =>
            UserDiscountMapper.toPersistence(ud)
        ) || [];

        return entity;
    }

    static toDomain(entity: DiscountEntity): Discount {
        return new Discount(
            entity.id,
            entity.codeDiscount,
            entity.initialDate,
            entity.expirationDate,
            entity.type,
            entity.percentage || 0,
            entity.amount || 0,
            entity.status,
            entity.userDiscounts?.map(ud =>
                UserDiscountMapper.toDomain(ud)
            ) || []
        );
    }
}
