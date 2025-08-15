import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from '../../infrastructure/gateways/response/http.response';
import { CarDTO } from "../dtos/car.dto";
import { formatValidationErrors } from "../../shared/validators/error-formatter";

export class CarMiddleware {
    constructor(private httpResponse: HttpResponse) { }
    carValidator(req: Request, res: Response, next: NextFunction) {
        const { image, brand, model, year, price, specifications_car } = req.body;
        const valid = new CarDTO();

        valid.brand = brand;
        valid.model = model;
        valid.year = year;
        valid.price = price;
        valid.specifications_car = specifications_car;
        valid.image = image;

        validate(valid).then((err) => {
            if (err.length > 0) {
                res.status(400).json({ message: err[0].constraints });
                return this.httpResponse.Error(res, formatValidationErrors(err));
            } else {
                next();
            }
        });
    }
}