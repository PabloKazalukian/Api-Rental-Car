import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../base.service';
import { UserDTO } from '../../../application/dtos/user.dto';
import { hashPassword } from '../../utils/hashPassword';
import { UserEntity } from '../../db/entities/user.entity';
import { User, UserRole } from '../../../domain/entities/user';
import { UserMapper } from '../../../application/mappers/user.mappers';

export class UserRepository extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }

    async findById(id: string): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id });
    }

    async findUserWithRole(id: string, role: UserRole): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id, role: role });
    }

    async createUser(body: User): Promise<UserEntity> {
        // Hash password before saving to database
        const newUser = UserMapper.toPersistence(body);
        const repo = await this.execRepository();
        return repo.save(newUser);
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository();
        return repo.delete({ id });
    }

    async updateUser(id: string, infoUpdate: UserEntity): Promise<UpdateResult> {
        const repo = await this.execRepository();
        return repo.update(id, infoUpdate);
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ email });
    }

    async findUserByUsername(username: string): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ username });
    }
}
