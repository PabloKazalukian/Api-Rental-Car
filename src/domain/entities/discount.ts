import { UserDiscount } from "./user-discount";

export enum DiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
}

export class Discount {

    constructor(
        public id: string,
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