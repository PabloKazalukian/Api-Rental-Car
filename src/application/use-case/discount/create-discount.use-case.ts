import { Discount } from "../../../domain/entities/discount";
import { DiscountEntity } from "../../../infrastructure/db/entities/discount.entity";
import { DiscountRepository } from "../../../infrastructure/gateways/repositories/discount.repository";
import { CreateDiscountDTO } from "../../dtos/discount.dto";
import { DiscountMapper } from "../../mappers/discount.mapper";


export class CreateDiscountUseCase {
    constructor(private readonly discountSvc: DiscountRepository) { }

    async execute(discount: CreateDiscountDTO): Promise<Discount> {

        const disc = new Discount(
            crypto.randomUUID(),
            discount.codeDiscount,
            discount.initialDate,
            discount.expirationDate,
            discount.type,
            discount.percentage || 0,
            discount.amount || 0,
            discount.status,
            []
        );

        const discountentity = DiscountMapper.toPersistence(disc);

        const saveDiscount: DiscountEntity = await this.discountSvc.createDiscount(discountentity);


        return DiscountMapper.toDomain(saveDiscount);

    }
}
// if (!user) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.INVALID_CREDENTIALS)