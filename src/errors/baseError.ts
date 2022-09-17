export default class BaseError extends Error {
    constructor(description: string, name: string, statusCode: number, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.description = description
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this);
    };
    description: string;
    statusCode: number;
    isOperational: boolean;
};
