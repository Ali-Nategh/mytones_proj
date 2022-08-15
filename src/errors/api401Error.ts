import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api401Error extends BaseError {
    constructor(
        description: string,
        name = "401 Unauthorized",
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
