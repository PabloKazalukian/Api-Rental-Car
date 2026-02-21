import { BaseDTO } from '../../infrastructure/config/base.dto';
import { IsArray, IsOptional } from 'class-validator';
import { UserEntity } from '../../infrastructure/db/entities/user.entity';
import { RequestEntity } from '../../infrastructure/db/entities/request.entity';

export class CartDTO extends BaseDTO {
    user!: UserEntity;

    @IsOptional()
    requests!: string[];
}

export class UpdateCartDTO {
    @IsArray()
    requests!: string[];
}
