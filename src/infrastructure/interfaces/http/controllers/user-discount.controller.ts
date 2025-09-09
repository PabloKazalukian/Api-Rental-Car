import { Request, Response } from 'express';
import { HttpResponse } from '../../../gateways/response/http.response';
import { UserDiscountRepository } from '../../../gateways/repositories/user-discount.repository';
import { CreateUserDiscountUseCase } from '../../../../application/use-case/user-discount/create.user-case';
import { IUserDiscountController } from '../../../../domain/interface/controllers/user-controller.interface';

export class UserDiscountController implements IUserDiscountController {
    constructor(
        private readonly createUDiscUseCase: CreateUserDiscountUseCase,
        private readonly userDiscountSvc: UserDiscountRepository,
        private readonly httpResponse: HttpResponse
    ) {}

    async getAllUserDiscount(req: Request, res: Response) {
        try {
            const data = await this.userDiscountSvc.findAllUserDiscount();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async getUserDiscountById(req: Request, res: Response) {
        try {
            const data = await this.userDiscountSvc.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Solicitud no encontrada');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createUserDiscount(req: Request, res: Response) {
        try {
            let data = await this.createUDiscUseCase.execute(req.body);

            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async paymentUserDiscount(req: Request, res: Response) {
        try {
            let data = await this.userDiscountSvc.updateUserDiscount(req.params.id, req.body);

            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
