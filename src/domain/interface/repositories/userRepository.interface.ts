// domain/repositories/IUserRepository.ts

import { User, UserRole } from '../../entities/user';

export interface IUserRepository {
    findAll(): Promise<User[]>; // ← Devuelve User de DOMINIO
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>; // ← Recibe y devuelve User de DOMINIO
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findWithRole(id: string, role: UserRole): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserWithRole(id: string, role: UserRole): Promise<User | null>;
}
