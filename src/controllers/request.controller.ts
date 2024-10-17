import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { CarService } from "../services/car.service";
import { CarEntity } from "../entities/car.entity";
import { RequestDTO } from "../dto/request.dto";
import { HttpResponse } from "../shared/http.response";
// import { PaymentService } from "../services/payment.service";
import { Automatic, PaymentDTO } from "../dto/payment.dto";

export class RequestController {
    constructor(
        private readonly requestSvc: RequestService = new RequestService(),
        private readonly carSvc: CarService = new CarService(),
        // private readonly paymentSvc: PaymentService = new PaymentService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getAllRequest(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.requestSvc.findAllRequest();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async getRequestById(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.requestSvc.findByUser(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Solicitud no encontrada');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    };

    async getRequestByUser(req: Request, res: Response): Promise<Response> {
        try {
            let user_id = req.params.user_id
            let data = await this.requestSvc.findByUser(user_id);
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    };

    async getRequestBycar(req: Request, res: Response): Promise<Response> {
        try {
            let car_id = req.params.car_id
            let data = await this.requestSvc.findByCar(car_id);
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
    async createRequest(req: Request, res: Response): Promise<Response> {
        let price;
        try {
            let data = await this.requestSvc.createRequest(req.body);
            let amount = await this.getPriceCarById(res, req.body);
            console.log("amount:", amount);
            // if (amount == 0) return this.httpResponse.NotFound(res);
            // console.log("new:", re)
            // return this.httpResponse.Ok(res, newRequest);
            // create payment
            let datejs = new Date();
            let newPayment: PaymentDTO = new PaymentDTO();
            newPayment.amount = amount;
            newPayment.paid_date = new Date();
            newPayment.automatic = Automatic.YES;
            newPayment.request_id = data;

            // { amount, paid_date: datejs, automatic: "yes", request_id: data.id }
            // this.paymentSvc.createPayment(newPayment)

            return this.httpResponse.Created(res, data);
        } catch (err) {
            console.log(err)
            return this.httpResponse.Error(res, err);
        }
    };

    private async getPriceCarById(res: Response, request: RequestDTO): Promise<any> {
        try {
            // console.log(request.car_id)
            console.log("super_id", request.car_id)
            let data: CarEntity | null;
            if (typeof request.car_id == "string") {
                data = await this.carSvc.findPriceCarById(request.car_id);
                if (data !== null) {
                    let days: number = this.getDays(request.initialDate, request.finalDate);
                    let amount: number = days * data.price;
                    // console.log(amount);
                    return amount;
                } else { return 0; }
            }


            // console.log(data, request.id);
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