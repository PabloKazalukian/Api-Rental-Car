import { Cart } from '../../../domain/entities/cart';
import { CartRepository } from '../../../infrastructure/gateways/repositories/cart.repository';
import { DiscountRepository } from '../../../infrastructure/gateways/repositories/discount.repository';
import { AuthErrorMessages } from '../../../shared/constants/error-messages.enum';
import { HttpStatus } from '../../../shared/constants/http-status.enum';
import { HttpException } from '../../../shared/exeptions/http.exeption';
import { CreateDiscountDTO } from '../../dtos/discount.dto';
import { CartMapper } from '../../mappers/cart.mapper';

export interface ICreateCartUseCase {
    execute(userId: string): Promise<Cart>;
}

export class CreateCartUseCase {
    constructor(private readonly cartRepository: CartRepository) {}

    async execute(userId: string): Promise<Cart> {
        const cart = await this.cartRepository.findOrCreateCart(userId);
        return CartMapper.toDomain(cart);
    }
}
