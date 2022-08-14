import BaseError from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export default class Api403Error extends BaseError {
    constructor(
        description: string,
        name = "401 Forbidden",
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
        ) { 
            super(description, name, statusCode, isOperational)
        }
}
