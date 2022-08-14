import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api500Error extends BaseError {
    constructor(
        name: string,
        statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR,
        description = "500 Internal Server Error",
        isOperational = true
        ) { 
            super(name, statusCode, isOperational, description)
        }
}
