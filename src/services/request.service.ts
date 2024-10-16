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
            .getMany()
    }
    async findById(id: string): Promise<RequestEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }
    async createRequest(newRequest: RequestDTO): Promise<RequestEntity> {
        return (await this.execRepository).save(newRequest)
    }
    async deleteRequest(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updateRequest(id: string, infoUpdate: RequestDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }
}