import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api404Error extends BaseError {
    constructor(
        name: string,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = "404 Not Found",
        isOperational = true
        ) { 
            super(name, statusCode, isOperational, description)
        }
}
