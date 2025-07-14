import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { UserDTO } from "../dtos/user.dto";
import { UserEntity, UserRole } from "../entities/user.entity";
import bcryptjs from 'bcryptjs';
import { hashPassword } from "../utils/hashPassword";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }

    async findById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }

    async findUserWithRole(id: string, role: UserRole): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id, role: role })
    }

    async createUser(body: UserDTO): Promise<UserEntity> {

        // Hash password before saving to database
        const newUser = await this.createUserEntity(body);

        return (await this.execRepository).save(newUser)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ email })
    }

    async findUserByUsername(username: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ username })
    }

    async createUserEntity(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body);
        if (newUser.password !== null) {

            newUser.password = await hashPassword(newUser.password)
        }
        return newUser
    }
}