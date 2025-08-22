export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export enum UserType {
    LOCAL = "local",
    GOOGLE = "google",
    GITHUB = "github",
    MICROSOFT = "microsoft"
}

export class User {
    constructor(
        public readonly id: string,
        public username: string,
        public email: string,
        public password: string,
        public role: UserRole,
        public type: UserType
    ) { }
}
