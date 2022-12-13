import { NextFunction, Request, Response } from 'express';

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(`error ${err.message}`); // log the error
    const status = 500;
    return res.status(status).send(err.message);
}

export default handleError;
