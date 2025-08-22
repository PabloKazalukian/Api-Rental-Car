import { UserDTO } from "../../application/dtos/user.dto";
import { UserEntity } from "../../infrastructure/db/entities/user.entity";
import { UserRole } from "../entities/user";

export interface IUserService {
    findUserByEmail(email: string): Promise<UserEntity | null>;
    findUserByUsername(username: string): Promise<UserEntity | null>;
    findUserWithRole(id: string, role: UserRole): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    createUser(user: UserDTO): Promise<UserEntity>;
}

export interface IAuthService {
    validateUser(identifier: string, password: string): Promise<UserEntity | null>;
    generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }>;
}