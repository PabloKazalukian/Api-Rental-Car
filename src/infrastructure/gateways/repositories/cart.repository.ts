// infrastructure/gateways/repositories/cart.repository.ts
import { CartEntity } from '../../db/entities/cart.entity';
import { BaseService } from '../../base.service';
import { RedisProvider } from '../../cache/redis.client';

export class CartRepository extends BaseService<CartEntity> {
    private CACHE_PREFIX = 'cart:';

    constructor() {
        super(CartEntity);
    }

    private cacheKey(userId: string) {
        return `${this.CACHE_PREFIX}${userId}`;
    }

    async findOrCreateCart(userId: string): Promise<CartEntity> {
        const redis = RedisProvider.getClient();
        const cacheKey = this.cacheKey(userId);
        console.log('USER ID EN REPO', userId);

        // const cachedCart = await redis.get(cacheKey);
        // if (cachedCart) {
        //     console.log('CACHED CART', cachedCart);
        //     const cartData = JSON.parse(cachedCart);
        //     if (cartData.requests === 'undefined') {
        //         RedisProvider.del(cacheKey);
        //         cartData.requests = [];
        //     }
        //     console.log('CART DATA DESPUES DE PARSEAR', cartData);
        //     return cartData;
        // }

        // 2. Revisar DB
        const repo = await this.execRepository();
        let [cart] = await repo.find({
            where: { user: { id: userId } },
            relations: ['user']
        });

        console.log('CART EN REPO', cart);

        if (!cart) {
            // 3. Crear nuevo si no existe
            const newCart = new CartEntity();
            newCart.user = { id: userId } as any;
            cart = repo.create(newCart);
            const cartnew = await repo.save(cart);
            console.log('CART DESPUES DE CREAR', cartnew);
        }

        // 4. Guardar en Redis
        await redis.set(cacheKey, JSON.stringify(cart), { EX: 3600 });

        console.log('CART FINAL EN REPO', cart);
        return cart;
    }

    async updateCart(cart: CartEntity): Promise<CartEntity> {
        const redis = RedisProvider.getClient();

        const repo = await this.execRepository();
        const savedCart = await repo.save(cart);

        // Sincronizar Redis
        const cacheKey = this.cacheKey(cart.user.id);
        await redis.set(cacheKey, JSON.stringify(savedCart), { EX: 300 });

        return savedCart;
    }

    async clearCart(userId: string): Promise<void> {
        const redis = RedisProvider.getClient();

        const cacheKey = this.cacheKey(userId);
        await redis.del(cacheKey);

        const repo = await this.execRepository();
        await repo.delete({ user: { id: userId } });
    }
}
