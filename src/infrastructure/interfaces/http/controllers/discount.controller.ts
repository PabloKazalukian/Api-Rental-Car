import { Request, Response } from 'express';
import { HttpResponse } from '../../../gateways/response/http.response';
import { DiscountRepository } from '../../../gateways/repositories/discount.repository';
import { CreateDiscountUseCase } from '../../../../application/use-case/discount/create-discount.use-case';
import { IDiscountController } from '../../../../domain/interface/controllers/discount-controller.interface';

export class DiscountController implements IDiscountController {
    constructor(
        private readonly createDiscUseCase: CreateDiscountUseCase,
        private readonly discountSvc: DiscountRepository,
        private readonly httpResponse: HttpResponse
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
