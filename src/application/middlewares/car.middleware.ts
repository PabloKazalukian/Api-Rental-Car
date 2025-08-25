import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from '../../infrastructure/gateways/response/http.response';
import { CarDTO } from "../dtos/car.dto";
import { formatValidationErrors } from "../../shared/validators/error-formatter";
import { JwtMiddleware } from "./jwt.middleware";
import { HttpResponseSingleton } from "../../infrastructure/gateways/response/http-singleton.response";

export class CarMiddleware extends JwtMiddleware {
    constructor() {
        super(HttpResponseSingleton.getInstance());
    }
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
                return this.httpResponse.Error(res, formatValidationErrors(err));
            } else {
                next();
            }
        });
    }
}