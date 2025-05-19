import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PassportUse } from '../utils/passport.use';
import { AuthService } from '../services/auth.service';

export class GoogleOAuthStrategy extends AuthService {
    constructor() {
        super();
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: Function
    ) {
        // Aquí puedes buscar o crear al usuario en la base de datos
        // Por ahora solo devolvemos el perfil
        const user = {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value
        };
        return done(null, user);
    }

    get use() {
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const host = process.env.HOST || 'localhost:3100';
        console.log('host', host);
        console.log('protocol', protocol);
        const callbackURL = `${protocol}://${host}/api/auth/google/callback`;

        return PassportUse<
            GoogleStrategy,
            {
                clientID: string;
                clientSecret: string;
                callbackURL: string;
            },
            (
                accessToken: string,
                refreshToken: string,
                profile: Profile,
                done: Function
            ) => Promise<void>
        >(
            'google',
            GoogleStrategy,
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: callbackURL
            },
            this.validate
        );
    }
}