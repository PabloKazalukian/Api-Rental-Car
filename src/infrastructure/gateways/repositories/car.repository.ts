import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../base.service';
import { CarDTO } from '../../../application/dtos/car.dto';
import { CarEntity } from '../../db/entities/car.entity';
import { ICarRepository } from '../../../domain/interface/repositories/car-repository.interface';

export class CarRepository extends BaseService<CarEntity> implements ICarRepository {
    constructor() {
        super(CarEntity);
    }

    async findAllCar(): Promise<CarEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }
    async findById(id: string): Promise<CarEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id });
    }

    async findByModelAndYear(model: string, year: number): Promise<CarEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ model, year });
    }
    async createCar(newCar: CarDTO): Promise<CarEntity> {
        const repo = await this.execRepository();
        return repo.save(newCar);
    }
    async deleteCar(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository();
        return repo.delete({ id });
    }
    async updateCar(id: string, infoUpdate: CarDTO): Promise<UpdateResult> {
        const repo = await this.execRepository();
        return repo.update(id, infoUpdate);
    }

    async findPriceCarById(id: string): Promise<CarEntity | null> {
        const repo = await this.execRepository();
        return repo.createQueryBuilder().select('car.price').from(CarEntity, 'car').where('car.id = :id', { id }).getOne();
    }
}
