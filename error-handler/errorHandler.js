const { Request, Response, NextFunction } = require('express');
const { ErrorCode } = require('./error-code');
const { ErrorException } = require('./error-exception');

const errorHandler = (err= Error, req = Request, res = Response, next = NextFunction) => {
    console.log('Error handling middleware called.');
    console.log('Path', req.path);
    console.error('Error occured:', err);
    if(err instanceof ErrorException) {
        console.log('Error is known.');
        res.status(err.status).send(err);
    } else {
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500 })
    }
}

module.exports = { errorHandler }
