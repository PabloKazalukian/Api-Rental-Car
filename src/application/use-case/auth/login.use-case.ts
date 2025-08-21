import { HttpException } from "../../../shared/exeptions/http.exeption";
import { AuthErrorMessages } from "../../../shared/constants/error-messages.enum";
import { HttpStatus } from "../../../shared/constants/http-status.enum";
import { IAuthService } from "../../../domain/repositories/auth.interface";
import { User } from "../../../domain/entities/user";
import { UserMapper } from "../../mappers/user.mappers";
import { UserEntity } from "../../../infrastructure/db/entities/user.entity";

export class LoginUseCase {
    constructor(
        private readonly authService: IAuthService,
    ) { }

    async execute(user: User | undefined): Promise<{ accessToken: string; user: UserEntity }> {

        if (user === undefined) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.TOKEN_INVALID);
        const userEntity: UserEntity = UserMapper.toPersistence(user)
        return this.authService.generateJWT(userEntity);
    }
}