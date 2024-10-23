import { ConfigServer } from "../config/config"
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { UserEntity } from "../entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";


export class AuthService extends ConfigServer {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt
    ) {
        super();
    }

    public async validateUser(usernameOrEmail: string, pass: string): Promise<UserEntity | null> {
        // validate user by username or email
        const userByUsername: UserEntity | null = await this.userService.findUserByUsername(usernameOrEmail);
        const userByEmail: UserEntity | null = await this.userService.findUserByEmail(usernameOrEmail);

        if (userByUsername) {
            const isMatch = await bcryptjs.compare(pass, userByUsername.password);
            if (isMatch) {
                return userByUsername;
            }
        }

        if (userByEmail) {
            const isMatch = await bcryptjs.compare(pass, userByEmail.password);
            if (isMatch) {
                return userByEmail;
            }
        }

        return null;
    }

    sing(payload: jwt.JwtPayload, secret: any) {
        return this.jwtInstance.sign(payload, secret, { expiresIn: '24h' });
    }

    public async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
        const userConsult = await this.userService.findUserWithRole(user.id, user.role)

        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: userConsult!.id
        }

        if (userConsult) {
            user.password = "Not permission"
        }

        return {
            accessToken: this.sing(payload, this.getEnvironment('AUTH_JWT')),
            user
        }
    }
}