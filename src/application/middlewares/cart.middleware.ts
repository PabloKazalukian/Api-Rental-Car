import { NextFunction, Request, Response } from 'express';
import { UpdateCartDTO } from '../dtos/cart.dto';
import { CartEntity } from '../../infrastructure/db/entities/cart.entity';
import { JwtMiddleware } from './jwt.middleware';
import { EntityValidator } from '../../infrastructure/utils/entity-validator';
import { HttpResponseSingleton } from '../../infrastructure/gateways/response/http-singleton.response';
import { ICartMiddleware } from '../../domain/interface/middlewares/cart-middleware.interface';

export class CartMiddleware extends JwtMiddleware implements ICartMiddleware {
    constructor() {
        super(HttpResponseSingleton.getInstance());
    }

    async cartValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const validator = new EntityValidator<CartEntity, UpdateCartDTO>(UpdateCartDTO);
            const validatedDTO = await validator.validate(req.body);

            req.body = validatedDTO;
            next();
        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }
}
