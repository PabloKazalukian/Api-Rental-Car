import { Cart } from '../../domain/entities/cart';
import { CartEntity } from '../../infrastructure/db/entities/cart.entity';
import { RequestMapper } from './request.mapper';

export class CartMapper {
    static toPersistence(cart: Cart): CartEntity {
        const entity = new CartEntity();
        entity.id = cart.id; // si usas UUID generado en dominio
        entity.user = { id: cart.user.id } as any;
        entity.requests = cart.requests;
        return entity;
    }

    static toDomain(entity: CartEntity): Cart {
        return new Cart(entity.id, entity.user, entity.requests);
    }
}
