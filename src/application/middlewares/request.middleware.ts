import { NextFunction, Request, Response } from "express";
import { CreateRequestDTO } from "../dtos/request.dto";
import { Request as RequestDomain } from "../../domain/entities/request";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { JwtMiddleware } from "./jwt.middleware";
import { parseDateOrThrow } from "../../infrastructure/utils/date.utils";
import { EntityValidator } from "../../infrastructure/utils/entity-validator";

export class RequestMiddleware extends JwtMiddleware {
    constructor(private httpResponse: HttpResponse) {
        super(httpResponse)
    }

    async requestValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const requestDomain: RequestDomain = req.body;

            requestDomain.finalDate = parseDateOrThrow(requestDomain.finalDate);
            requestDomain.initialDate = parseDateOrThrow(requestDomain.initialDate);

            const validator = new EntityValidator<RequestDomain, CreateRequestDTO>(CreateRequestDTO);
            const validatedDTO = await validator.validate(requestDomain);

            req.body = validatedDTO;

        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }
}