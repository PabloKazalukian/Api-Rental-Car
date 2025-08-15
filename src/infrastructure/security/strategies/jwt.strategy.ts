import { Strategy as JwtStr, ExtractJwt, StrategyOptionsWithSecret } from "passport-jwt";
import { PayloadToken } from "../../../interfaces/models/auth.interface";
import { PassportUse } from "../../utils/passport.use";

export class JwtStrategy {

    async validate(payload: PayloadToken, done: any) {
        return done(null, payload);
    }

    get use() {
        return PassportUse<
            JwtStr,
            StrategyOptionsWithSecret,
            (payload: PayloadToken, done: any) => Promise<PayloadToken>
        >(
            "jwt",
            JwtStr,
            {
                // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                jwtFromRequest: ExtractJwt.fromExtractors([
                    (req) => {
                        if (req && req.cookies) {
                            return req.cookies['access_token'];
                        }
                        return null;
                    }
                ]),
                secretOrKey: "SECRETO",
                ignoreExpiration: false
            },
            this.validate
        );
    }
}