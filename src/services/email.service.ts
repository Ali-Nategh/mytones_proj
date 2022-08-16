import { Response } from 'express';
import nodemailer from 'nodemailer';
import { sendError } from '../errors/errorHandler';
import { httpStatusCodes } from '../errors/httpStatusCodes';
import { PrismaFindByEmail, PrismaUpdateOtp, PrismaVerifyEmail } from '../repositories/user.repository';
import generateOTP from './otp.service';


const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
    },
}


const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export const sendMail = async (params: { to: any; OTP: any; }) => {
    try {
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: params.to,
            subject: 'Your Validation Password ✔',
            html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the club.</h2>
          <h4>You are officially In after entering the password ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
        });
        return console.log(info);
    } catch (error) {
        console.log(error);
        return false;
    }
};


export async function verifyEmailService(email: string, otp: string, res: Response) {
    const user = await PrismaFindByEmail(email)
    if (!user) return sendError(httpStatusCodes.NOT_FOUND, "Email Not found", res);
    if (otp !== user.otp) return sendError(httpStatusCodes.UNAUTHORIZED, "Password incorrect", res);
    if (user.active) return sendError(httpStatusCodes.BAD_REQUEST, "Email already active", res);
    await PrismaVerifyEmail(user.id)
    return res.status(httpStatusCodes.OK).send("Email successfully verified");
}


export async function resendEmailService(email: string, res: Response) {
    const user = await PrismaFindByEmail(email)
    if (!user) return sendError(httpStatusCodes.NOT_FOUND, "Email Not found", res);
    if (user.active) return sendError(httpStatusCodes.BAD_REQUEST, "Email already active", res);
    const OTP = generateOTP()
    PrismaUpdateOtp(email, OTP)
    sendMail({ to: email, OTP: OTP });
    return res.status(httpStatusCodes.OK).send("Email successfully sent again");
}
