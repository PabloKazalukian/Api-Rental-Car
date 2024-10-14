import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { CarService } from "../services/car.service";
import { CarEntity } from "../entities/car.entity";
import { RequestDTO } from "../dto/request.dto";
import { HttpResponse } from "../shared/http.response";
import { PaymentService } from "../services/payment.service";

export class RequestController {
    constructor(
        private readonly requestSvc: RequestService = new RequestService(),
        private readonly carSvc: CarService = new CarService(),
        private readonly paymentSvc: PaymentService = new PaymentService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getAllRequest(req: Request, res: Response) {
        try {
            const data = await this.requestSvc.findAllRequest();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async getRequestById(req: Request, res: Response) {
        try {
            const data = await this.requestSvc.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Solicitud no encontrada');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createRequest(req: Request, res: Response) {
        let price;
        try {
            let data = await this.requestSvc.createRequest(req.body);
            // let data;
            // let amount = await this.getPriceCarById(res, req.body);
            // console.log("body", req.body);
            // if (amount == 0) return this.httpResponse.NotFound(res);
            // console.log("new:", re)
            // return this.httpResponse.Ok(res, newRequest);
            //create payment
            // let datejs = new Date();
            // let today = `${datejs.getFullYear()}-${datejs.getMonth() + 1}-${datejs.getDate()}`;
            // let newPayment = { amount, paid_date: today, automatic: "yes", }
            // this.paymentSvc.createPayment(newPayment)

            return this.httpResponse.Created(res, data);
        } catch (err) {
            console.log(err)
            return this.httpResponse.Error(res, err);
        }
    }

    private async getPriceCarById(res: Response, request: RequestDTO): Promise<any> {
        try {
            // console.log(request.car_id)
            const data: CarEntity | null = await this.carSvc.findPriceCarById(request.id);
            if (data !== null) {
                let days: number = this.getDays(request.initialDate, request.finalDate);
                let amount: number = days * data.price;
                // console.log(amount);
                return amount;
            } else { return 0; }
            // this.httpResponse.Created(res,data);;
        }
        catch (err) {
            console.log(err)
            return this.httpResponse.Forbidden(res, err);
        }
    }

    private getDays = (f1: string, f2: string): number => {
        let aFecha1: string[] = f1.split('-');
        let aFecha2: string[] = f2.split('-');
        let fFecha1 = Date.UTC(parseInt(aFecha1[0], 10), parseInt(aFecha1[1], 10) - 1, parseInt(aFecha1[2], 10));
        let fFecha2 = Date.UTC(parseInt(aFecha2[0], 10), parseInt(aFecha2[1], 10) - 1, parseInt(aFecha2[2], 10));
        let dif = fFecha2 - fFecha1;
        let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        return dias + 1;
    };
}