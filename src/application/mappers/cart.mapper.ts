import { Cart } from "../../domain/entities/cart";
import { CartEntity } from "../../infrastructure/db/entities/cart.entity";

export class CartMapper {
    static toPersistence(cart: Cart): CartEntity {
        const entity = new CartEntity();
        entity.id = cart.id; // si usas UUID generado en dominio
        return entity;
    }

    static toDomain(entity: CartEntity): Cart {
        return new Cart(
            entity.id,
        );
    }
}