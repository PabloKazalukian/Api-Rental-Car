import { UserEntity } from "../../entities/user.entity";
import { IAuthService } from "../../interfaces/auth.interface";
import { AuthErrorMessages } from "../../shared/constants/error-messages.enum";
import { HttpStatus } from "../../shared/constants/http-status.enum";
import { HttpException } from "../../shared/exeptions/http.exeption";

export class LoginUseCase {
    constructor(
        private readonly authService: IAuthService,
    ) { }

    async execute(user: UserEntity | undefined): Promise<{ accessToken: string; user: UserEntity }> {

        if (user === undefined) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.TOKEN_INVALID);
        return this.authService.generateJWT(user);
    }
}