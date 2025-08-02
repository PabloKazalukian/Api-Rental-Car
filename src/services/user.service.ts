import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { UserDTO } from "../dtos/user.dto";
import { UserEntity, UserRole } from "../entities/user.entity";
import { hashPassword } from "../utils/hashPassword";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]> {
        const repo = await this.execRepository();
        return repo.find();
    }

    async findById(id: string): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id })
    }

    async findUserWithRole(id: string, role: UserRole): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ id, role: role })
    }

    async createUser(body: UserDTO): Promise<UserEntity> {

        // Hash password before saving to database
        const newUser = await this.createUserEntity(body);
        console.log('entidad: ', newUser)
        const repo = await this.execRepository();
        return repo.save(newUser)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        const repo = await this.execRepository();
        return repo.delete({ id })
    }
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        const repo = await this.execRepository();
        return repo.update(id, infoUpdate)
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ email })
    }

    async findUserByUsername(username: string): Promise<UserEntity | null> {
        const repo = await this.execRepository();
        return repo.findOneBy({ username })
    }



    async createUserEntity(body: UserDTO): Promise<UserEntity> {
        const user = new UserEntity();
        user.username = body.username;
        user.email = body.email;

        user.password = await hashPassword(body.password);
        return user;
    }
}