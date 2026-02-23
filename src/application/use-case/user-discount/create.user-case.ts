import { UserDiscount } from '../../../domain/entities/user-discount';
import { IDiscountRepository } from '../../../domain/interface/repositories/discount-repository.interface';
import { IUserDiscountRepository } from '../../../domain/interface/repositories/user-discount-repository.interface';
import { IUserRepository } from '../../../domain/interface/repositories/userRepository.interface';
import { UserDiscountEntity } from '../../../infrastructure/db/entities/user-discount.entity';
import { DiscountErrorMessages, UserErrorMessages } from '../../../shared/constants/error-messages.enum';
import { HttpStatus } from '../../../shared/constants/http-status.enum';
import { HttpException } from '../../../shared/exeptions/http.exeption';
import { CreateUserDiscountDTO } from '../../dtos/user-discount.dto';
import { DiscountMapper } from '../../mappers/discount.mapper';
import { UserDiscountMapper } from '../../mappers/user-discount.mapper';

export class CreateUserDiscountUseCase {
    constructor(
        private readonly uDiscountSvc: IUserDiscountRepository,
        private readonly userSvc: IUserRepository,
        private readonly discountSvc: IDiscountRepository
    ) {}

    async execute(uDiscount: CreateUserDiscountDTO): Promise<UserDiscount> {
        const user = await this.userSvc.findById(uDiscount.userId);
        if (user === null) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, UserErrorMessages.USER_NOT_FOUND);
        }

        const discount = await this.discountSvc.findById(uDiscount.discountId);
        if (discount === null) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, DiscountErrorMessages.DISCOUNT_NOT_FOUND);
        }

        const disc = new UserDiscount(
            crypto.randomUUID(),
            uDiscount.requestedDate,
            uDiscount.issueDate,
            user,
            DiscountMapper.toDomain(discount),
            null,
            uDiscount.status
        );

        const uDiscountEntity: UserDiscountEntity = UserDiscountMapper.toPersistence(disc);
        const saveUDiscount: UserDiscountEntity = await this.uDiscountSvc.createUserDiscount(uDiscountEntity);

        return UserDiscountMapper.toDomain(saveUDiscount);
    }
}
