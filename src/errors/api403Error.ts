import BaseError from "./baseError";
import { httpStatus } from "./httpStatusCodes";

export default class Api403Error extends BaseError {
    constructor(
        description: string,
        name = "403 Forbidden",
        statusCode = httpStatus.FORBIDDEN,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
