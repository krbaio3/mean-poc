export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.send('error', {
        error: err,
        code: 500
    });
}
