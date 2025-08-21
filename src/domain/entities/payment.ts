import { Request } from "./request";
import { UserDiscount } from "./user-discount";

export enum Automatic {
    YES = "yes",
    NO = "no",
}

export class Payment {
    constructor(
        public paidDate: Date,
        public createdDate: Date,
        public automatic: Automatic,
        public request: Request,
        public userDiscount: UserDiscount | null = null
    ) { }

    isAutomatic(): boolean {
        return this.automatic === Automatic.YES;
    }
}
