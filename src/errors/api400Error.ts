import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api400Error extends BaseError {
    constructor(
        name: string,
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = "400 Bad Request",
        isOperational = true
        ) { 
            super(name, statusCode, isOperational, description)
        }
}
