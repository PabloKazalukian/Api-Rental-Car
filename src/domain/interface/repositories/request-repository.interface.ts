import { DeleteResult, UpdateResult } from 'typeorm';
import { RequestDTO } from '../../../application/dtos/request.dto';
import { RequestEntity } from '../../../infrastructure/db/entities/request.entity';

export interface IRequestRepository {
    findAllRequest(): Promise<RequestEntity[]>;
    findById(id: string): Promise<RequestEntity | null>;
    findByIds(ids: string[]): Promise<RequestEntity[]>;
    findByUser(idUser: string): Promise<RequestEntity[] | null>;
    findByUserAndCar(idUser: string): Promise<RequestEntity[] | null>;
    findByCar(idCar: string): Promise<RequestEntity[] | null>;
    createRequest(newRequest: RequestDTO): Promise<RequestEntity>;
    deleteRequest(id: string): Promise<DeleteResult>;
    updateRequest(id: string, infoUpdate: RequestDTO): Promise<UpdateResult>;
}
