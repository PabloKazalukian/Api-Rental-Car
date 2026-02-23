import { DeleteResult, UpdateResult } from 'typeorm';
import { CarDTO } from '../../../application/dtos/car.dto';
import { CarEntity } from '../../../infrastructure/db/entities/car.entity';

export interface ICarRepository {
    findAllCar(): Promise<CarEntity[]>;
    findById(id: string): Promise<CarEntity | null>;
    findByModelAndYear(model: string, year: number): Promise<CarEntity | null>;
    createCar(newCar: CarDTO): Promise<CarEntity>;
    deleteCar(id: string): Promise<DeleteResult>;
    updateCar(id: string, infoUpdate: CarDTO): Promise<UpdateResult>;
    findPriceCarById(id: string): Promise<CarEntity | null>;
}
