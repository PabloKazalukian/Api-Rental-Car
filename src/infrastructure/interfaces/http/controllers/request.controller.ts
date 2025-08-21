import { Request, Response } from "express";
import { RequestRepository } from "../../../gateways/repositories/request.repository";
import { CarRepository } from "../../../gateways/repositories/car.repository";
import { RequestDTO } from "../../../../application/dtos/request.dto";
import { HttpResponse } from "../../../gateways/response/http.response";
import { getDays } from "../../../utils/date.utils";
import { StateCar } from "../../../db/entities/request.entity";
import { CarEntity } from "../../../db/entities/car.entity";

export class RequestController {
    constructor(
        private readonly requestSvc: RequestRepository,
        private readonly carSvc: CarRepository,
        private readonly httpResponse: HttpResponse
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
    };

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
    };

    async confirmRequest(req: Request, res: Response): Promise<Response> {
        try {
            const { requestId } = req.body; // Obtener el ID de la request desde la URL

            // Buscar la solicitud en la base de datos
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
    };

    async createRequest(req: Request, res: Response): Promise<Response> {
        try {

            console.log(req.body)
            let data = await this.requestSvc.createRequest(req.body);
            let amount = await this.getAmountCarById(res, req.body);

            if (amount == 0) { return this.httpResponse.NotFound(res); }

            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    };

    private async getAmountCarById(res: Response, request: RequestDTO): Promise<any> {
        try {
            let data: CarEntity | null;
            if (typeof request.car_id == "string") {

                data = await this.carSvc.findPriceCarById(request.car_id);
                if (data !== null) {

                    console.log(typeof request.initialDate, typeof request.finalDate)
                    let days: number = getDays(request.initialDate, request.finalDate);
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
}