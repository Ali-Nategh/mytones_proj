import BaseError from "./baseError";
import { httpStatus } from "./httpStatusCodes";

export default class Api404Error extends BaseError {
    constructor(
        description: string,
        name = "404 Not Found",
        statusCode = httpStatus.NOT_FOUND,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
