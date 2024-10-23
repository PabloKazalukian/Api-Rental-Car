import { UserRole } from "../dto/user.dto";

export interface PayloadToken {
    role: UserRole;
    sub: string;
}