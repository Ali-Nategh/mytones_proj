import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api404Error extends BaseError {
    constructor(
        description: string,
        name = "404 Not Found",
        statusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true
    ) {
        super(description, name, statusCode, isOperational)
    }
}
