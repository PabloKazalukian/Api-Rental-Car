import { Request, Response } from 'express';
import { CartRepository } from '../../../gateways/repositories/cart.repository';
import { HttpResponse } from '../../../gateways/response/http.response';

export class CartController {
    constructor(
        private readonly cartService: CartRepository,
        private readonly httpResponse: HttpResponse
    ) {}

    async getAllCart(req: Request, res: Response) {
        try {
            const data = await this.cartService.findAllCart();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async getCartById(req: Request, res: Response) {
        try {
            const data = await this.cartService.findById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Cart not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createCart(req: Request, res: Response) {
        try {
            const data = await this.cartService.createCart(req.body);
            return res.status(201).json(data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
