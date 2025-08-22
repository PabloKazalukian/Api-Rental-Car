import { Profile } from "passport";
import { UserRole } from "../../domain/entities/user";

export interface PayloadToken {
    role: UserRole;
    username: string;
    sub: string;
}

export interface PayloadTokenGoogle {
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
}