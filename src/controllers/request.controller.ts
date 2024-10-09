import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { CarService } from "../services/car.service";
import { CarEntity } from "../entities/car.entity";
import { RequestDTO } from "../dto/request.dto";

export class RequestController {
    constructor(private readonly requestSvc: RequestService = new RequestService(), private readonly carSvc: CarService = new CarService()) { }

    async getAllRequest(req: Request, res: Response) {
        try {
            const data = await this.requestSvc.findAllRequest();
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    };

    async getRequestById(req: Request, res: Response) {
        try {
            const data = await this.requestSvc.findById(req.params.id);
            if (!data) return res.status(404).json({ message: "Car not found" });
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    async createRequest(req: Request, res: Response) {
        let price;
        try {
            let data = await this.getPriceCarById(req.body);
            console.log(data);
            // const data = await this.requestSvc.createRequest(req.body);
            // console.log(data);
            res.status(201).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    private async getPriceCarById(request: RequestDTO): Promise<any> {
        try {
            const data: CarEntity | null = await this.carSvc.findPriceCarById(request.car_id);
            console.log("data:", data);
            if (data !== null) {
                console.log(typeof request.initial_date)
                let days: number = this.getDays(request.initial_date, request.final_date);
                console.log("days", days);
                let amount: number = days * data.price;
                // console.log(amount);
                return amount;
            } else { return 1; }
            // res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
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