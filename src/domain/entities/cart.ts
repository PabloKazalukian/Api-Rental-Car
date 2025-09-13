import { Request } from './request';
import { User } from './user';

export class Cart {
    constructor(
        public readonly id: string,
        public user: User,
        public requests: string[]
    ) {}
}
