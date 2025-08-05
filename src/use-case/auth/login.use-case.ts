import { UserEntity } from "../../entities/user.entity";
import { IAuthService } from "../../interfaces/auth.interface";

export class LoginUseCase {
    constructor(
        private readonly authService: IAuthService,
    ) { }

    async execute(user: UserEntity | undefined): Promise<{ accessToken: string; user: UserEntity }> {

        if (user === undefined) throw new Error('Invalid credentials');
        return this.authService.generateJWT(user);
    }
}