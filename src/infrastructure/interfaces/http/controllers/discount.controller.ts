import { Request, Response } from 'express';
import { HttpResponse } from '../../../gateways/response/http.response';
import { DiscountRepository } from '../../../gateways/repositories/discount.repository';
import { CreateDiscountUseCase, ICreateDiscountUseCase } from '../../../../application/use-case/discount/create-discount.use-case';
import { IDiscountController } from '../../../../domain/interface/controllers/discount-controller.interface';
import { IHttpResponse } from '../../../gateways/response/http-singleton.response';
import { IDiscountRepository } from '../../../../domain/interface/repositories/discount-repository.interface';

export class DiscountController implements IDiscountController {
    constructor(
        private readonly createDiscUseCase: ICreateDiscountUseCase,
        private readonly discountSvc: IDiscountRepository,
        private readonly httpResponse: IHttpResponse
    ) {}

    async getAllDiscount(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.discountSvc.findAllDiscount();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async getDiscountById(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.discountSvc.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Solicitud no encontrada');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createDiscount(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.createDiscUseCase.execute(req.body);

            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
