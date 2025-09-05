import { NextFunction, Request, Response } from 'express';
import { CreateUserDiscountDTO, UserDiscountDTO } from '../dtos/user-discount.dto';
import { JwtMiddleware } from './jwt.middleware';
import { HttpResponseSingleton } from '../../infrastructure/gateways/response/http-singleton.response';
import { UserDiscount } from '../../domain/entities/user-discount';
import { EntityValidator } from '../../infrastructure/utils/entity-validator';
import { parseDateOrThrow } from '../../infrastructure/utils/date.utils';

export class UserDiscountMiddleware extends JwtMiddleware {
    constructor() {
        super(HttpResponseSingleton.getInstance());
    }

    async discountCreateValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const userDiscountDomain: UserDiscount = req.body;
            this.validateUserDiscountDates(userDiscountDomain);

            const validator = new EntityValidator<UserDiscount, CreateUserDiscountDTO>(CreateUserDiscountDTO);
            const validatorDTO = await validator.validate(userDiscountDomain);

            req.body = validatorDTO;

            next();
        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }

    async discountConfirmValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const userDiscountDomain: UserDiscount = req.body;

            this.validateUserDiscountDates(userDiscountDomain);

            const validator = new EntityValidator<UserDiscount, CreateUserDiscountDTO>(CreateUserDiscountDTO);
            const validatorDTO = await validator.validate(userDiscountDomain);

            req.body = validatorDTO;

            next();
        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }

    private validateUserDiscountDates(discount: UserDiscount) {
        discount.issueDate = parseDateOrThrow(discount.issueDate);
        discount.requestedDate = parseDateOrThrow(discount.requestedDate);
    }
}
