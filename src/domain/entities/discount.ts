import { DiscountType } from "../../infrastructure/db/entities/discount.entity";
import { UserDiscount } from "./user-discount";

export class Discount {

    constructor(
        public codeDiscount: string,
        public initialDate: Date,
        public expirationDate: Date,
        public type: DiscountType,
        public percentage: number,
        public amount: number,
        public status: boolean,
        public userDiscounts: UserDiscount[],
    ) { }

}