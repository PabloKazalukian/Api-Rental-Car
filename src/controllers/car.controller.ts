import { Request, Response } from "express";
import { CarService } from "../services/car.service";

export class CarController {
    constructor(private readonly carService: CarService = new CarService()) { }

    async getAllCar(req: Request, res: Response) {
        try {
            const data = await this.carService.findAllCar();
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    };

    async getCarById(req: Request, res: Response) {
        try {
            const data = await this.carService.findById(req.params.id);
            if (!data) return res.status(404).json({ message: "Car not found" });
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    async createCar(req: Request, res: Response) {
        try {
            console.log(req.body);
            const data = await this.carService.createCar(req.body);
            res.status(201).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    async getPriceById(req: Request, res: Response) {
        try {
            const data = await this.carService.findPriceCarById(req.params.id);
            console.log(data);
            if (!data) return res.status(404).json({ message: "Car not found" });
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }
}