import carsData from "../json/db.json";
import { CarRepository } from "../../gateways/repositories/car.repository";
import { CarDTO } from "../../../application/dtos/car.dto";

export class CarSeeder {
    private carService = new CarRepository();

    async run() {
        for (const car of carsData) {

            const existing = await this.carService.findByModelAndYear(car.model, car.year);
            if (existing) {
                console.log(`Car ${car.model} ${car.year} already exists`);
                continue;
            }

            const newCar = new CarDTO();
            newCar.model = car.model;
            newCar.year = car.year;
            newCar.price = car.price;
            newCar.image = car.image;
            newCar.brand = car.brand;
            newCar.specifications_car = car.specifications_car;

            await this.carService.createCar(newCar);
            console.log(`Car ${car.model} (${car.year}) seeded.`);
        }

        console.log('Cars seeded');
    }
}