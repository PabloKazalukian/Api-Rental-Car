import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { CarService } from "../services/car.service";
import { CarEntity } from "../entities/car.entity";
import { RequestDTO } from "../dtos/request.dto";
import { HttpResponse } from "../shared/http.response";
// import { PaymentService } from "../services/payment.service";
// import { Automatic, PaymentDTO } from "../dto/payment.dto";
import { StateCar } from "../entities/request.entity";
import moment from 'moment';
import { error } from "console";

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
            let user_id = req.params.user_id;
            let data = await this.requestSvc.findByUserAndCar(user_id);

            if (!data || data.length === 0) {
                return this.httpResponse.NotFound(res, "Solicitudes no encontradas");
            }

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

            // Buscar la solicitud en la base de datos
            const request = await this.requestSvc.findById(requestId);

            if (request === null) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            } else {
                // Verificar si ya está cancelada
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

    async confirmRequest(req: Request, res: Response): Promise<Response> {
        try {
            const { requestId } = req.body; // Obtener el ID de la request desde la URL

            // Buscar la solicitud en la base de datos
            console.log(requestId)
            const request = await this.requestSvc.findById(requestId);

            if (request === null) {
                return res.status(404).json({ message: "Solicitud no encontrada" });
            } else {

                if (request.state === StateCar.CONFIRM) {
                    return res.status(400).json({ message: "La solicitud ya está confiramda" });
                }

                request.state = StateCar.CONFIRM;
                await this.requestSvc.updateRequest(request.id, request);

                return res.status(200).json({ message: "Solicitud confirmada exitosamente", request });
            }
        } catch (error) {
            console.error("Error al cancelar la solicitud:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    async createRequest(req: Request, res: Response): Promise<Response> {
        try {
            let data = await this.requestSvc.createRequest(req.body);
            let amount = await this.getAmountCarById(res, req.body);

            if (amount == 0) { return this.httpResponse.NotFound(res); }

            return this.httpResponse.Created(res, data);
        } catch (err) {
            // console.log(err)
            return this.httpResponse.Error(res, err);
        }
    };

    private async getAmountCarById(res: Response, request: RequestDTO): Promise<any> {
        try {
            let data: CarEntity | null;
            if (typeof request.car_id == "string") {

                data = await this.carSvc.findPriceCarById(request.car_id);
                if (data !== null) {

                    let days: number = this.getDays(request.initialDate, request.finalDate);
                    let amount: number = days * data.price;

                    return amount;
                } else { return 0; }
            } else {
                throw new Error('datos invalidos');
            }
        } catch (err) {
            console.error('Error en getAmountCarById:', err);
            throw err;
        }
    };

    private getDays = (date1: Date, date2: Date): number => {

        const format: string = 'D/M/YYYY'
        const momentDate1 = moment(date1, format);
        const momentDate2 = moment(date2, format);

        if (momentDate2.isAfter(momentDate1)) {
            throw new Error('datos invalidos');
        }

        return momentDate1.diff(momentDate2, 'days');
    };
}