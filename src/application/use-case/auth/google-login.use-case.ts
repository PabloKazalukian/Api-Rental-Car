import { User, UserRole, UserType } from "../../../domain/entities/user";
import { IUserService } from "../../../domain/repositories/auth.interface";
import { UserEntity } from "../../../infrastructure/db/entities/user.entity";
import { AuthErrorMessages } from "../../../shared/constants/error-messages.enum";
import { HttpStatus } from "../../../shared/constants/http-status.enum";
import { HttpException } from "../../../shared/exeptions/http.exeption";
import { UserMapper } from "../../mappers/user.mappers";


export interface UserGoogle {
    id: string
    email: string
    name: string,
    picture: string
}

export class GoogleLoginUseCase {
    constructor(private readonly userService: IUserService) { }

    async execute(user: UserGoogle | undefined): Promise<User> {
        if (!user) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.INVALID_CREDENTIALS);

        // Crear la entidad de dominio directamente
        const domainUser = new User(
            crypto.randomUUID(),
            user.name,
            user.email,
            "google-oauth",
            UserRole.USER,
            UserType.GOOGLE
        );

        // Buscar si ya existe
        const existingUserEntity = await this.userService.findUserByEmail(domainUser.email);

        if (!existingUserEntity) {
            // Mapear a DB y guardar
            const userEntity: UserEntity = UserMapper.toPersistence(domainUser);
            const savedEntity: UserEntity = await this.userService.createUser(userEntity);
            return UserMapper.toDomain(savedEntity);
        }

        return UserMapper.toDomain(existingUserEntity);
    }
}