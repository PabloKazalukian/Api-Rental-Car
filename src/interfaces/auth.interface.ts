import { UserDTO, UserRole } from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";

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