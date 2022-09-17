import { loginUserService, signUpUserService, logoutUserService, refreshUserTokenService } from "../services/user.service";
import { resendEmailService, verifyEmailService } from "../services/email.service";
import { sendOperationalError, logError, sendError } from "../errors/errorHandler";
import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../errors/httpStatusCodes";
import BaseError from "../errors/baseError";



export async function signUpUser(req: Request, res: Response) {
    try {
        await signUpUserService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "AGE_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "EMAIL_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "INTERNAL_SERVER_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};


export async function loginUser(req: Request, res: Response) {
    try {
        await loginUserService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "EMAIL_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "AUTHORITY_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "INTERNAL_SERVER_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
}


export async function logoutUser(req: Request, res: Response) {
    try {
        await logoutUserService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "TOKEN_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
}


export async function refreshUserToken(req: Request, res: Response) {
    try {
        await refreshUserTokenService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "TOKEN_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
}

export async function validateUserOtp(req: Request, res: Response) {
    if (!verifyEmailService(req.body.email, `${req.body.otp}`, res)) return;
}

export async function resendUserOtp(req: Request, res: Response) {
    if (!resendEmailService(req.body.email, res)) return;
}
