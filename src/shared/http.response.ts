import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    GONE = 410,
    PRECONDITION_FAILED = 412,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    TOO_MANY_REQUESTS = 429,
    SERVER_ERROR = 500,
    REQUEST_HEADER_FIELDS
}

export class HttpResponse {
    Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: "Success",
            data
        });
    }

    Created(res: Response, data?: any): Response {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: "Created",
            data
        });
    }

    NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            message: data
        });
    }

    Conflict(res: Response, data?: any): Response {
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            statusMsg: "Conflict",
            message: data
        })
    }

    Unauthorized(res: Response, data?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthoraized",
            message: data
        });
    }

    Forbidden(res: Response, data?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            message: data
        });
    }

    Error(res: Response, data?: any): Response {
        return res.status(HttpStatus.SERVER_ERROR).json({
            status: HttpStatus.SERVER_ERROR,
            statusMsg: "Internal Server Error",
            message: data
        });
    }
}