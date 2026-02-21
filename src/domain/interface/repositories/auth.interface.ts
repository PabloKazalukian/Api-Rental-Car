import { UserEntity } from '../../../infrastructure/db/entities/user.entity';
import { User, UserRole } from '../../entities/user';

export interface IUserService {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserWithRole(id: string, role: UserRole): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
}

export interface IAuthService {
    validateUser(identifier: string, password: string): Promise<User | null>;
    generateJWT(user: UserEntity): Promise<{ accessToken: string; user: User }>;
}
