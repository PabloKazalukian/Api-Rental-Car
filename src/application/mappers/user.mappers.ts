import { User } from "../../domain/entities/user";
import { UserEntity, UserType, UserRole } from "../../infrastructure/db/entities/user.entity";
// import { UserRole } from "../dtos/user.dto";

export class UserMapper {
    static toPersistence(user: User): UserEntity {
        const entity = new UserEntity();
        entity.id = user.id; // si usas UUID generado en dominio
        entity.username = user.username;
        entity.email = user.email;
        entity.password = user.password;
        entity.role = user.role as UserRole;
        entity.type = user.type as UserType;
        return entity;
    }

    static toDomain(entity: UserEntity): User {
        return new User(
            entity.id,
            entity.username,
            entity.email,
            entity.password,
            entity.role,
            entity.type
        );
    }
}
