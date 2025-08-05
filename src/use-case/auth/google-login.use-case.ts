import { UserDTO, UserRole } from "../../dtos/user.dto";
import { UserEntity } from "../../entities/user.entity";
import { IAuthService, IUserService } from "../../interfaces/auth.interface";

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

        if (user === undefined) throw new Error('Invalid credentials');
        let googleUser = new UserDTO();
        googleUser.username = user.name;
        googleUser.email = user.email;
        googleUser.password = 'google-oauth-dummy';
        googleUser.role = UserRole.USER;

        let userGoogle = await this.userService.findUserByEmail(googleUser.email);
        if (!user) {
            // 👌 No existe, lo registramos
            return await this.userService.createUser(googleUser);
        }
        if (userGoogle === null) throw new Error('Invalid credentials');
        return userGoogle

        // return this.authService.generateJWT(user);
    }
}