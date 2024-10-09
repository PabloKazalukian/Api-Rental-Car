import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { RequestEntity } from "../entities/request.entity";
import { RequestDTO } from "../dto/request.dto";

export class RequestService extends BaseService<RequestEntity> {
    constructor() {
        super(RequestEntity);
    }

    async findAllRequest(): Promise<RequestEntity[]> {
        return (await this.execRepository).find();
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