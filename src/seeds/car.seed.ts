import carsData from "../../db/db.json";
import { CarDTO } from "../dto/car.dto";
import { CarService } from "../services/car.service";

export class CarSeeder {
    private carService = new CarService();

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