import { Profile } from "passport";
import { UserRole } from "../../application/dtos/user.dto";

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