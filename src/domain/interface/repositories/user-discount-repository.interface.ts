import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDiscountEntity } from '../../../infrastructure/db/entities/user-discount.entity';
import { UserDiscount } from '../../entities/user-discount';
import { UserDiscountDTO } from '../../../application/dtos/user-discount.dto';

export interface IUserDiscountRepository {
    findAllUserDiscount(): Promise<UserDiscountEntity[]>;
    findById(id: string): Promise<UserDiscountEntity | null>;
    createUserDiscount(newDiscount: UserDiscountEntity): Promise<UserDiscountEntity>;
    deleteUserDiscount(id: string): Promise<DeleteResult>;
    updateUserDiscount(id: string, infoUpdate: UserDiscountDTO): Promise<UpdateResult>;
}
