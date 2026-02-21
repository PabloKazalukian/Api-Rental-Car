import { BaseService } from '../../base.service';
import { UserEntity } from '../../db/entities/user.entity';
import { User, UserRole } from '../../../domain/entities/user';
import { UserMapper } from '../../../application/mappers/user.mapper';
import { IUserRepository } from '../../../domain/interface/repositories/userRepository.interface';

export class UserRepository extends BaseService<UserEntity> implements IUserRepository {
    constructor() {
        super(UserEntity);
    }

    async findAll(): Promise<User[]> {
        const repo = await this.execRepository();
        const entities = await repo.find();
        return entities.map((entity) => UserMapper.toDomain(entity));
    }

    async findById(id: string): Promise<User | null> {
        const repo = await this.execRepository();
        const entity = await repo.findOneBy({ id });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const repo = await this.execRepository();
        const entity = await repo.findOneBy({ email });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async createUser(user: User): Promise<User> {
        const entity = UserMapper.toPersistence(user);
        const repo = await this.execRepository();
        const savedEntity = await repo.save(entity);
        return UserMapper.toDomain(savedEntity);
    }

    async update(id: string, userData: Partial<User>): Promise<User | null> {
        const repo = await this.execRepository();

        // Primero obtenemos la entidad existente
        const existingEntity = await repo.findOneBy({ id });
        if (!existingEntity) return null;

        // Actualizamos solo los campos proporcionados
        const updatedEntity = UserMapper.merge(existingEntity, userData);
        const savedEntity = await repo.save(updatedEntity);

        return UserMapper.toDomain(savedEntity);
    }

    async delete(id: string): Promise<boolean> {
        const repo = await this.execRepository();
        const result = await repo.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async findWithRole(id: string, role: UserRole): Promise<User | null> {
        const repo = await this.execRepository();
        const entity = await repo.findOneBy({ id, role });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const repo = await this.execRepository();
        const entity = await repo.findOneBy({ email });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const repo = await this.execRepository();
        const entity = await repo.findOneBy({ username });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findUserWithRole(id: string, role: UserRole): Promise<User | null> {
        const repo = await this.execRepository();
        const entity = await repo.findOneBy({ id, role: role });
        return entity ? UserMapper.toDomain(entity) : null;
    }
}
