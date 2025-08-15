import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PassportUse } from '../../utils/passport.use';

export class GoogleOAuthStrategy   {
    

    async validate(
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: Function
    ) {
        const user = {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value
        };
        return done(null, user);
    }

    get use() {
        const reedirect = process.env.NODE_ENV === 'production' ? 'https://api-rental-car-9niy.onrender.com/api/auth/google/callback' : '/api/auth/google/callback';

        return PassportUse<
            GoogleStrategy,
            {
                clientID: string;
                clientSecret: string;
                callbackURL: string;
                passReqToCallback: true;
            },
            (
                req: any,
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
                callbackURL: reedirect,
                passReqToCallback: true
            },
            this.validate
        );
    }
}