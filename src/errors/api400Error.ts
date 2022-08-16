import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api400Error extends BaseError {
    constructor(
        description: string,
        name = "400 Bad Request",
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
