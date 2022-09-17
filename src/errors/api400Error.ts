import BaseError from "./baseError";
import { httpStatus } from "./httpStatusCodes";

export default class Api400Error extends BaseError {
    constructor(
        description: string,
        name = "400 Bad Request",
        statusCode = httpStatus.BAD_REQUEST,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
