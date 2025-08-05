import { HttpResponse } from '../http.response';
import { Response } from 'express';
import { HttpException } from './http.exeption';
import { statusToMethod } from './status-mapper.util';

export function catchError(err: unknown, res: Response, http: HttpResponse) {

    console.log('VEAMOS QUE PASA ACA::: ', err, res, http)
    if (err instanceof HttpException) {
        return http[statusToMethod(err.status)](res, err.message);
    }

    console.error('[UNHANDLED ERROR]', err);
    return http.Error(res, 'Error inesperado');
}