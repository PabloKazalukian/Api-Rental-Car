import { Request, Response } from "express";
import { HttpResponse } from "../../../gateways/response/http.response";
import { DiscountRepository } from "../../../gateways/repositories/discount.repository";

export class DiscountController {
    constructor(private readonly discountSvc: DiscountRepository, private readonly httpResponse: HttpResponse) { }

    async getAllDiscount(req: Request, res: Response) {
        try {
            const data = await this.discountSvc.findAllDiscount();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async getDiscountById(req: Request, res: Response) {
        try {
            const data = await this.discountSvc.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Solicitud no encontrada');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createDiscount(req: Request, res: Response) {
        try {
            let data = await this.discountSvc.createDiscount(req.body)

            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}