import { CartEntity } from '../../../infrastructure/db/entities/cart.entity';
import { CartDTO } from '../../../application/dtos/cart.dto';

export interface ICartRepository {
    cacheKey(userId: string): string;
    createCart(cart: CartDTO): Promise<CartEntity>;
    findOrCreateCart(userId: string): Promise<CartEntity>;
    updateCart(userId: string, requests: string[]): Promise<CartEntity>;
    clearCart(userId: string): Promise<void>;
}
