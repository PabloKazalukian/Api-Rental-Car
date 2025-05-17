import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { CarEntity } from "../entities/car.entity";
import { CarDTO } from "../dto/car.dto";
import { UserEntity } from "../entities/user.entity";

export class CarService extends BaseService<CarEntity> {
    constructor() {
        super(CarEntity);
    }

    async findAllCar(): Promise<CarEntity[]> {
        return (await this.execRepository).find();
    }
    async findById(id: string): Promise<CarEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    async findByModelAndYear(model: string, year: number): Promise<CarEntity | null> {
        return (await this.execRepository).findOneBy({ model, year })
    }
    async createCar(newCar: CarDTO): Promise<CarEntity> {
        return (await this.execRepository).save(newCar)
    }
    async deleteCar(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updateCar(id: string, infoUpdate: CarDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    async findPriceCarById(id: string): Promise<CarEntity | null> {
        console.log("id:", id)
        return (await this.execRepository).createQueryBuilder().select('car.price').from(CarEntity, 'car').where('car.id = :id', { id }).getOne();
    }

}