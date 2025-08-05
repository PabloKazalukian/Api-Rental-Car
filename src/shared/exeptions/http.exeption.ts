import { HttpStatus } from "../constants/http-status.enum";

export class HttpException extends Error {
    constructor(
        public readonly status: HttpStatus,
        public readonly message: string
    ) {
        super(message);
        this.name = 'HttpException';
    }
}
