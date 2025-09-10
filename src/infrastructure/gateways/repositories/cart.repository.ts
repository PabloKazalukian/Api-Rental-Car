import { CartEntity } from "../../db/entities/cart.entity";
import { CartDTO } from "../../../application/dtos/cart.dto";
import { BaseService } from '../../base.service';

export class CartRepository extends BaseService<CartEntity>{

    constructor(){
        super(CartEntity)
    }
    async findAllCart(): Promise<CartEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }

    async findById(id: string): Promise<CartEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id });
    }

    async createCart(payload: CartDTO): Promise<CartEntity> {
        const repo = await this.execRepository();
        return repo.save(payload);
    }
}

