export default class BaseError extends Error {
    constructor(description: string, name: string, statusCode: number, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this);
    };
    statusCode: number;
    isOperational: boolean;
};
