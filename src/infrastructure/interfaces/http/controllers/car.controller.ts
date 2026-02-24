import { Request, Response } from 'express';
import { ICarRepository } from '../../../../domain/interface/repositories/car-repository.interface';
import { IHttpResponse } from '../../../gateways/response/http-singleton.response';
import { ICarController } from '../../../../domain/interface/controllers/car-controller.interface';

export class CarController implements ICarController {
    constructor(
        private readonly carService: ICarRepository,
        private readonly httpResponse: IHttpResponse
    ) {}

    async getAllCar(req: Request, res: Response) {
        try {
            const data = await this.carService.findAllCar();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async getCarById(req: Request, res: Response) {
        try {
            const data = await this.carService.findById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Car not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createCar(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.carService.createCar(req.body);
            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async getPriceById(req: Request, res: Response) {
        try {
            const data = await this.carService.findPriceCarById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Car not found' });
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
