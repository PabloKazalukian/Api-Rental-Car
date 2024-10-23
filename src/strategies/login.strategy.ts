import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';

const authService: AuthService = new AuthService();

export class LoginStrategy {
    async validate(username: string, passport: string, done: any): Promise<UserEntity> {
        const user = await authService.validateUser(username, passport)
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }

        return done(null, user, { message: 'Logged in successfully' });
    }

    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction>("login", LocalStrategy, { usernameField: "username", passwordField: "password" }, this.validate)
    }

}