import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { CarService } from "../services/car.service";
import { CarEntity } from "../entities/car.entity";
import { RequestDTO } from "../dto/request.dto";
import { HttpResponse } from "../shared/http.response";
// import { PaymentService } from "../services/payment.service";
import { Automatic, PaymentDTO } from "../dto/payment.dto";
import { StateCar } from "../entities/request.entity";

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
            let data = await this.requestSvc.findByUserAndCar(user_id);
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
    async cancelRequest(req: Request, res: Response): Promise<Response> {
        try {
            const { requestId } = req.body; // Obtener el ID de la request desde la URL

            console.log(req.body)
            // Buscar la solicitud en la base de datos
            console.log(requestId)
            const request = await this.requestSvc.findById(requestId);

            if (request === null) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            } else {
                // Verificar si ya está cancelada
                console.log(request.state)
                if (request.state === StateCar.CANCEL) {
                    return res.status(400).json({ message: "La solicitud ya está cancelada" });
                }

                // Actualizar el estado a "can"
                request.state = StateCar.CANCEL;


                // Guardar los cambios en la base de datos
                await this.requestSvc.updateRequest(request.id, request);

                return res.status(200).json({ message: "Solicitud cancelada exitosamente", request });
            }
        } catch (error) {
            console.error("Error al cancelar la solicitud:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    async createRequest(req: Request, res: Response): Promise<Response> {
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
            // newPayment.amount = amount;
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

    private getDays = (f1: Date, f2: Date): number => {
        // Convertir ambas fechas a milisegundos desde la época Unix (1970-01-01)
        let fFecha1 = f1.getTime();  // f1 es un objeto Date
        let fFecha2 = f2.getTime();  // f2 es un objeto Date

        // Calcular la diferencia en milisegundos
        let dif = fFecha2 - fFecha1;

        // Convertir la diferencia de milisegundos a días (1 día = 1000 ms * 60 s * 60 min * 24 hrs)
        let dias = Math.floor(dif / (1000 * 60 * 60 * 24));

        // Devolver el número de días + 1 (si lo deseas incluir como parte de la duración)
        return dias + 1;
    };
}