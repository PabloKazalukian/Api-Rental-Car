import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { CarDTO } from '../dtos/car.dto';
import { formatValidationErrors } from '../../shared/validators/error-formatter';
import { IHttpResponse } from '../../infrastructure/gateways/response/http-singleton.response';
import { ICarMiddleware } from '../../domain/interface/middlewares/car-middleware.interface';

export class CarMiddleware implements ICarMiddleware {
    constructor(private readonly httpResponse: IHttpResponse) {}
    carValidator(req: Request, res: Response, next: NextFunction) {
        const { image, brand, model, year, price, specifications_car } = req.body;
        const valid = new CarDTO();

        console.log(req.body);
        valid.brand = brand;
        valid.model = model;
        valid.year = year;
        valid.price = price;
        valid.specifications_car = specifications_car;
        valid.image = image;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, formatValidationErrors(err));
            } else {
                next();
            }
        });
    }
}
