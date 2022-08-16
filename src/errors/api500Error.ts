import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api500Error extends BaseError {
    constructor(
        description: string,
        name = "500 Internal Server Error",
        statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
