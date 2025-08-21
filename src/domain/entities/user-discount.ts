import { Discount } from "./discount";
import { User } from "./user";
import { UserDiscountStatus } from "../../infrastructure/db/entities/user-discount.entity";
import { PaymentEntity } from "../../infrastructure/db/entities/payment.entity";

export class UserDiscount {
    constructor(
        public requestedDate: Date,
        public issueDate: Date,
        public user: User,
        public discount: Discount,
        public payment: PaymentEntity | null,
        public status: UserDiscountStatus
    ) { }
}