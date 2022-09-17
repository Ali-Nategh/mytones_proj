import BaseError from "./baseError";
import { httpStatus } from "./httpStatusCodes";

export default class Api401Error extends BaseError {
    constructor(
        description: string,
        name = "401 Unauthorized",
        statusCode = httpStatus.BAD_REQUEST,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
