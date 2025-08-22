import { Response } from "express";
import { HttpStatus } from "../../../shared/constants/http-status.enum";

/** Contrato de respuestas correctas */
export interface ISuccessResponse {
    Ok(res: Response, data?: any): Response;
    Created(res: Response, data?: any): Response;
}

/** Contrato de respuestas de error */
export interface IErrorResponse {
    NotFound(res: Response, data?: any): Response;
    Conflict(res: Response, data?: any): Response;
    Unauthorized(res: Response, data?: any): Response;
    Forbidden(res: Response, data?: any): Response;
    ErrorServer(res: Response, data?: any): Response;
    Error(res: Response, data?: any): Response;
}

/** Contrato general que extiende ambos */
export interface IHttpResponse extends ISuccessResponse, IErrorResponse { }

/** Implementación Singleton */
export class HttpResponseSingleton implements IHttpResponse {
    private static instance: HttpResponseSingleton;

    private constructor() { } // evita `new` directo

    public static getInstance(): HttpResponseSingleton {
        if (!HttpResponseSingleton.instance) {
            HttpResponseSingleton.instance = new HttpResponseSingleton();
        }
        return HttpResponseSingleton.instance;
    }

    Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: "Success",
            data,
        });
    }

    Created(res: Response, data?: any): Response {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: "Created",
            data,
        });
    }

    NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            message: data,
        });
    }

    Conflict(res: Response, data?: any): Response {
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            statusMsg: "Conflict",
            message: data,
        });
    }

    Unauthorized(res: Response, data?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            message: data,
        });
    }

    Forbidden(res: Response, data?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            message: data,
        });
    }

    ErrorServer(res: Response, data?: any): Response {
        return res.status(HttpStatus.SERVER_ERROR).json({
            status: HttpStatus.SERVER_ERROR,
            statusMsg: "Internal Server Error",
            message: data,
        });
    }

    Error(res: Response, data?: any): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: "Bad Request",
            message: data,
        });
    }
}
