import { NextFunction, Request, Response } from 'express';
import { CreateDiscountDTO } from '../dtos/discount.dto';
import { JwtMiddleware } from './jwt.middleware';
import { HttpResponseSingleton } from '../../infrastructure/gateways/response/http-singleton.response';
import { Discount, DiscountType } from '../../domain/entities/discount';
import { EntityValidator } from '../../infrastructure/utils/entity-validator';
import { DiscountErrorMessages } from '../../shared/constants/error-messages.enum';
import { parseDateOrThrow } from '../../infrastructure/utils/date.utils';
import { IDiscountMiddleware } from '../../domain/interface/middlewares/discount-middleware.interface';

export class DiscountMiddleware extends JwtMiddleware implements IDiscountMiddleware {
    constructor() {
        super(HttpResponseSingleton.getInstance());
    }

    async discountValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const discountDomain: Discount = req.body;

            this.validateDiscountDates(discountDomain);

            const validator = new EntityValidator<Discount, CreateDiscountDTO>(CreateDiscountDTO);
            const validatorDTO = await validator.validate(discountDomain);

            this.validateDiscountType(discountDomain);

            req.body = validatorDTO;

            next();
        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }

    private validateDiscountType(discountDomain: Discount) {
        if (discountDomain.type === DiscountType.FIXED) {
            if (discountDomain.amount === null) {
                throw new Error(DiscountErrorMessages.INVALID_TYPE);
            }
        } else {
            if (discountDomain.type === DiscountType.PERCENTAGE && discountDomain.percentage === null) {
                throw new Error(DiscountErrorMessages.INVALID_TYPE);
            }
        }
    }

    private validateDiscountDates(discount: Discount) {
        discount.initialDate = parseDateOrThrow(discount.initialDate);
        discount.expirationDate = parseDateOrThrow(discount.expirationDate);
    }
}
