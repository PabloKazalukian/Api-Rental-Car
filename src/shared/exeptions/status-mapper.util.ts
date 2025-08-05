// src/shared/utils/status-mapper.util.ts

import { HttpStatus } from '../constants/http-status.enum';

export function statusToMethod(status: HttpStatus): keyof {
    Unauthorized: any,
    NotFound: any,
    Conflict: any,
    Forbidden: any,
    Error: any
} {
    switch (status) {
        case HttpStatus.UNAUTHORIZED:
            return 'Unauthorized';
        case HttpStatus.NOT_FOUND:
            return 'NotFound';
        case HttpStatus.CONFLICT:
            return 'Conflict';
        case HttpStatus.FORBIDDEN:
            return 'Forbidden';
        default:
            return 'Error';
    }
}
