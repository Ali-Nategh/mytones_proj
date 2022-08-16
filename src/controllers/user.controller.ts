import { loginUserService, signUpUserService, logoutUserService, refreshUserTokenService, verifyEmailService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";



export async function signUpUser(req: Request, res: Response) {
    signUpUserService(req, res);
};


export async function loginUser(req: Request, res: Response) {
    loginUserService(req, res);
}


export async function logoutUser(req: Request, res: Response) {
    logoutUserService(req, res);
}


export async function refreshUserToken(req: Request, res: Response) {
    refreshUserTokenService(req, res);
}

export async function validateUserOtp(req: Request, res: Response) {
    if (!verifyEmailService(req.body.email, req.body.otp, res)) return;
}
