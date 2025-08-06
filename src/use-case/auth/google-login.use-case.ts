import { UserDTO, UserRole } from "../../dtos/user.dto";
import { UserEntity, UserType } from "../../entities/user.entity";
import { IUserService } from "../../interfaces/auth.interface";
import { AuthErrorMessages } from "../../shared/constants/error-messages.enum";
import { HttpStatus } from "../../shared/constants/http-status.enum";
import { HttpException } from "../../shared/exeptions/http.exeption";

interface UserGoogle {
    id: string
    email: string
    name: string,
    picture: string
}

export class GoogleLoginUseCase {
    constructor(
        private readonly userService: IUserService
    ) { }

    async execute(user: UserGoogle | undefined): Promise<UserEntity> {

        if (user === undefined) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.INVALID_CREDENTIALS)
        let googleUser = new UserDTO();
        googleUser.username = user.name;
        googleUser.email = user.email;
        googleUser.password = 'google-oauth-dummy';
        googleUser.role = UserRole.USER;
        googleUser.type = UserType.GOOGLE;

        let userGoogle = await this.userService.findUserByEmail(googleUser.email);
        if (!user) {
            // 👌 No existe, lo registramos
            return await this.userService.createUser(googleUser);
        }
        if (userGoogle === null) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.USER_NOT_FOUND);
        return userGoogle
    }
}