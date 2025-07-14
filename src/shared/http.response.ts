import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    BAD_REQUEST = 400,
    CONFLICT = 409,
    GONE = 410,
    TOO_MANY_REQUESTS = 429,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_FAILED = 412,
    TOO_MANY_REQUESTS_PER_SECOND = 429,
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
            error: data
        });
    }

    Conflict(res: Response, data?: any): Response {
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            statusMsg: "Conflict",
            error: data
        })
    }

    Unauthorized(res: Response, data?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthoraized",
            error: data
        });
    }

    Forbidden(res: Response, data?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            error: data
        });
    }

    Error(res: Response, data?: any): Response {
        return res.status(HttpStatus.SERVER_ERROR).json({
            status: HttpStatus.SERVER_ERROR,
            statusMsg: "Internal Server Error",
            error: data
        });
    }
}