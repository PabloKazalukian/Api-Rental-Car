import { UserDiscount } from '../../../domain/entities/user-discount';
import { UserDiscountEntity } from '../../../infrastructure/db/entities/user-discount.entity';
import { DiscountRepository } from '../../../infrastructure/gateways/repositories/discount.repository';
import { UserDiscountRepository } from '../../../infrastructure/gateways/repositories/user-discount.repository';
import { UserRepository } from '../../../infrastructure/gateways/repositories/user.repository';
import { DiscountErrorMessages, UserErrorMessages } from '../../../shared/constants/error-messages.enum';
import { HttpStatus } from '../../../shared/constants/http-status.enum';
import { HttpException } from '../../../shared/exeptions/http.exeption';
import { CreateUserDiscountDTO } from '../../dtos/user-discount.dto';
import { DiscountMapper } from '../../mappers/discount.mapper';
import { UserDiscountMapper } from '../../mappers/user-discount.mapper';
import { UserMapper } from '../../mappers/user.mapper';

export class CreateUserDiscountUseCase {
    constructor(
        private readonly uDiscountSvc: UserDiscountRepository,
        private readonly userSvc: UserRepository,
        private readonly discountSvc: DiscountRepository
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
            UserMapper.toDomain(user),
            DiscountMapper.toDomain(discount),
            null,
            uDiscount.status
        );

        const uDiscountEntity: UserDiscountEntity = UserDiscountMapper.toPersistence(disc);
        const saveUDiscount: UserDiscountEntity = await this.uDiscountSvc.createUserDiscount(uDiscountEntity);

        return UserDiscountMapper.toDomain(saveUDiscount);
    }
}
