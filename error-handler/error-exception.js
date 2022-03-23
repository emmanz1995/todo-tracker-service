const { ErrorCode } = require('./error-code');

class ErrorException extends Error {
    status = null;
    metaData = null;
    constructor(code = ErrorCode.UnknownError, metaData = null) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.status = 500;
        this.metaData = metaData;
        switch(code) {
            case ErrorCode.NotFound:
                this.status = 404
                break;
            case ErrorCode.Unauthenticated:
                this.status = 401
                break;
            default:
                this.status = 500;
                break;
        }
    }
}

module.exports = { ErrorException }
