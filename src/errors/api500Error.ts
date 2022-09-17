import BaseError from "./baseError";
import { httpStatus } from "./httpStatusCodes";

export default class Api500Error extends BaseError {
    constructor(
        description: string,
        name = "500 Internal Server Error",
        statusCode = httpStatus.INTERNAL_SERVER_ERROR,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
