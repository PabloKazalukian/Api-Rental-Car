import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { RequestEntity } from "../entities/request.entity";
import { RequestDTO } from "../dto/request.dto";
import { User } from '../interfaces/user.interface';
import { UserEntity } from "../entities/user.entity";

export class RequestService extends BaseService<RequestEntity> {

    constructor() {
        super(RequestEntity);
    }

    async findAllRequest(): Promise<RequestEntity[]> {
        return (await this.execRepository)
            .createQueryBuilder("request")
            .leftJoinAndSelect("request.user_id", "user_id")
            .select(["request", "user_id.username", "user_id.id", "user_id.email"])
            .leftJoinAndSelect("request.car_id", "car_id")
            .getMany();
    }

    async findById(id: string): Promise<RequestEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async findByUser(idUser: string): Promise<RequestEntity[] | null> {
        return (await this.execRepository)
            .createQueryBuilder("request")
            .leftJoinAndSelect("request.user_id", "user_id")
            .andWhere("(user_id.id = :iduser)", { iduser: idUser })
            .select(["request", "user_id.username", "user_id.id", "user_id.email"])
            .getMany();
    }

    async findByUserAndCar(idUser: string): Promise<RequestEntity[] | null> {
        return (await this.execRepository)
            .createQueryBuilder("request")
            .leftJoinAndSelect("request.user_id", "user_id")
            .leftJoinAndSelect("request.car_id", "car")
            .andWhere("(user_id.id = :iduser)", { iduser: idUser })
            .select(["request", "user_id.username", "user_id.id", "user_id.email", "car.id", "car.brand", "car.model"])
            .getMany();
    }

    async findByCar(idCar: string): Promise<RequestEntity[] | null> {
        return (await this.execRepository)
            .createQueryBuilder("request")
            .leftJoinAndSelect("request.car_id", "car_id")
            .andWhere("(car_id.id = :idcar)", { idcar: idCar })
            .andWhere("request.state != :cancelled", { cancelled: "can" })
            .select(["request", "car_id.id", "car_id.brand", "car_id.model", "car_id.year", "car_id.price", "car_id.image"])
            .getMany()
    }

    async createRequest(newRequest: RequestDTO): Promise<RequestEntity> {
        try {
            return (await this.execRepository).save(newRequest);
        } catch {
            throw new Error("FALLA CRITICA");
        }
    }

    async deleteRequest(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updateRequest(id: string, infoUpdate: RequestDTO): Promise<UpdateResult> {
        console.log(infoUpdate)
        return (await this.execRepository).update(id, infoUpdate);
    }
}