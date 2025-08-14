import { JwtPayload } from "jsonwebtoken";
import { IUserService } from "../../../interfaces/auth.interface";
import { HttpException } from "../../../shared/exeptions/http.exeption";
import { HttpStatus } from "../../../shared/constants/http-status.enum";
import { AuthErrorMessages } from "../../../shared/constants/error-messages.enum";
import { UserEntity } from "../../../domain/entities/user.entity";


export class RefreshTokenUseCase {
    constructor(
        private readonly userService: IUserService
    ) { }

    async execute(user: JwtPayload | undefined): Promise<UserEntity | null> {

        if (user === undefined || user.sub === undefined) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.TOKEN_INVALID);
        return await this.userService.findById(user.sub);
    }
}