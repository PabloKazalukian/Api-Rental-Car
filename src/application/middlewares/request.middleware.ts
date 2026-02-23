import { NextFunction, Request, Response } from 'express';
import { CreateRequestDTO, RequestsIdsDTO } from '../dtos/request.dto';
import { Request as RequestDomain } from '../../domain/entities/request';
import { JwtMiddleware } from './jwt.middleware';
import { parseDateOrThrow } from '../../infrastructure/utils/date.utils';
import { EntityValidator } from '../../infrastructure/utils/entity-validator';
import { HttpResponseSingleton } from '../../infrastructure/gateways/response/http-singleton.response';
import { IRequestMiddleware } from '../../domain/interface/middlewares/request-middleware.interface';

export class RequestMiddleware extends JwtMiddleware implements IRequestMiddleware {
    constructor() {
        super(HttpResponseSingleton.getInstance());
    }

    async requestValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const requestDomain: RequestDomain = req.body;

            requestDomain.finalDate = parseDateOrThrow(requestDomain.finalDate);
            requestDomain.initialDate = parseDateOrThrow(requestDomain.initialDate);

            const validator = new EntityValidator<RequestDomain, CreateRequestDTO>(CreateRequestDTO);
            const validatedDTO = await validator.validate(requestDomain);

            req.body = validatedDTO;

            next();
        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }

    async requestIdsValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const data: RequestsIdsDTO = req.body;

            const validator = new EntityValidator<RequestsIdsDTO, RequestsIdsDTO>(RequestsIdsDTO);
            const validatedDTO = await validator.validate(data);

            req.body = validatedDTO;

            next();
        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }
}
