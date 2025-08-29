import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { PassportUse } from "../../utils/passport.use";
import { authService } from "../../gateways/repositories/index.service";
import { UserEntity } from "../../db/entities/user.entity";

// const authService: AuthService = new AuthService();

export class LoginStrategy {
  async validate(
    username: string,
    passport: string,
    done: any
  ): Promise<UserEntity> {
    const user = await authService.validateUser(username, passport);
    if (!user) {
      return done(null, false, { message: "Incorrect username or password" });
    }

    return done(null, user, { message: "Logged in successfully" });
  }

  get use() {
    try {
      return PassportUse<LocalStrategy, Object, VerifyFunction>(
        "login",
        LocalStrategy,
        { usernameField: "identifier", passwordField: "password" },
        this.validate
      );
    } catch (err) {
      console.log("yo me equivoque");
    }
  }
}
