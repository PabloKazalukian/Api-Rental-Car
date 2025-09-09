import { Response } from 'express';
import { HttpStatus } from '../../../shared/constants/http-status.enum';

export class HttpResponse {
    Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: 'Success',
            data
        });
    }

    Created(res: Response, data?: any): Response {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: 'Created',
            data
        });
    }

    NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            message: data
        });
    }

    Conflict(res: Response, data?: any): Response {
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            statusMsg: 'Conflict',
            message: data
        });
    }

    Unauthorized(res: Response, data?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthoraized',
            message: data
        });
    }

    Forbidden(res: Response, data?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            message: data
        });
    }

    ErrorServer(res: Response, data?: any): Response {
        return res.status(HttpStatus.SERVER_ERROR).json({
            status: HttpStatus.SERVER_ERROR,
            statusMsg: 'Internal Server Error',
            message: data
        });
    }

    Error(res: Response, data?: any): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: 'Bad Request',
            message: data
        });
    }
}
