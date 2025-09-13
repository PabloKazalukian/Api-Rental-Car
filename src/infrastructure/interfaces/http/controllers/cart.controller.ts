import { Request, Response } from 'express';
import { CartRepository } from '../../../gateways/repositories/cart.repository';
import { HttpResponse } from '../../../gateways/response/http.response';

export class CartController {
    constructor(
        private readonly cartService: CartRepository,
        private readonly httpResponse: HttpResponse
    ) {}

    async getCartById(req: Request, res: Response) {
        try {
            console.log('LLEGUE AL CONTROLLER');
            const data = await this.cartService.findOrCreateCart(req.params.idUser);
            if (!data) return res.status(404).json({ message: 'Cart not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createCart(req: Request, res: Response) {
        try {
            const data = await this.cartService.findOrCreateCart(req.body);
            return res.status(201).json(data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async updateCart(req: Request, res: Response) {
        try {
            const data = await this.cartService.updateCart(req.body);
            if (!data) return res.status(404).json({ message: 'Cart not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
