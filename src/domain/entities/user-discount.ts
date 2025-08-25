import { Discount } from "./discount";
import { User } from "./user";
import { Payment } from "./payment";


export enum UserDiscountStatus {
    AVAILABLE = "available",
    USED = "used",
    EXPIRED = "expired"
}

export class UserDiscount {
    constructor(
        public id: string,
        public requestedDate: Date,
        public issueDate: Date,
        public user: User,
        public discount: Discount,
        public payment: Payment | null,
        public status: UserDiscountStatus
    ) { }
}