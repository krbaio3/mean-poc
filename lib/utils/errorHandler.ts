import { ErrorModel } from '../models/error.model';

export function errorHandler(err: any, text: string, status: number, req, res, next) {
    // if (res && res.headersSent) {
    //     return next(err);
    // }
    // res.status(500);
    // res.send('error', {
    //     error: err,
    //     code: 500
    // });
    const error: ErrorModel = {
        error: err,
        message: err.message || text,
        code: 404
    };

    return error;
}
