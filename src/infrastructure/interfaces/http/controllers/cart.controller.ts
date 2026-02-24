import { Request, Response } from 'express';
import { ICartController } from '../../../../domain/interface/controllers/cart-controller.interface';
import { IHttpResponse } from '../../../gateways/response/http-singleton.response';
import { ICartRepository } from '../../../../domain/interface/repositories/cart-repository.interface';

export class CartController implements ICartController {
    constructor(
        private readonly cartService: ICartRepository,
        private readonly httpResponse: IHttpResponse
    ) {}

    async getCartById(req: Request, res: Response) {
        try {
            const data = await this.cartService.findOrCreateCart(req.params.idUser);
            if (!data) return res.status(404).json({ message: 'Cart not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createCart(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.cartService.createCart(req.body);
            return res.status(201).json(data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async updateCart(req: Request, res: Response) {
        try {
            const { idUser } = req.params;
            const miArrayConDuplicados = [...new Set(req.body.requests as string[])];
            const data = await this.cartService.updateCart(idUser, miArrayConDuplicados);
            if (!data) return res.status(404).json({ message: 'Cart not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
