import { loginUserService, signUpUserService, logoutUserService, refreshUserTokenService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";



export async function signUpUser(req: Request, res: Response) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    signUpUserService(req, res);
};


export async function loginUser(req: Request, res: Response) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    loginUserService(req, res);
}


export async function logoutUser(req: Request, res: Response) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    logoutUserService(req, res);
}


export async function refreshUserToken(req: Request, res: Response) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    refreshUserTokenService(req, res);
}
