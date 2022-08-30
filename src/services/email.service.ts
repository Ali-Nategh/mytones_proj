import { PrismaFindOTP, PrismaFindEmail, PrismaUpdateOtp, PrismaVerifyEmail } from '../repositories/user.repository';
import { PrismaCreateUserFavorites } from '../repositories/music.repository';
import { httpStatusCodes } from '../errors/httpStatusCodes';
import { sendError } from '../errors/errorHandler';
import generateOTP from './otp.service';
import nodemailer from 'nodemailer';
import { Response } from 'express';


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
          <h2>Welcome to our Site!.</h2>
          <h4>You can listen to your favorite music right after entering the password ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up Password to get started</p>
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
    const userEmail = await PrismaFindEmail(email)
    if (!userEmail) return sendError(httpStatusCodes.NOT_FOUND, "Email Not Found", res);

    const userOTP = await PrismaFindOTP(userEmail.user_id);
    if (!userOTP) return sendError(httpStatusCodes.NOT_FOUND, "User Not Found", res);

    if (otp !== userOTP.otp) return sendError(httpStatusCodes.UNAUTHORIZED, "Password incorrect", res);
    if (userEmail.verified) return sendError(httpStatusCodes.BAD_REQUEST, "Email already active", res);

    await PrismaVerifyEmail(userEmail.id)
    await PrismaCreateUserFavorites(userEmail.user_id)

    return res.status(httpStatusCodes.OK).send("Email successfully verified");
}


export async function resendEmailService(email: string, res: Response) {
    const userEmail = await PrismaFindEmail(email)
    if (!userEmail) return sendError(httpStatusCodes.NOT_FOUND, "Email Not found", res);
    if (userEmail.verified) return sendError(httpStatusCodes.BAD_REQUEST, "Email already active", res);

    const OTP = generateOTP()
    await PrismaUpdateOtp(email, OTP)

    sendMail({ to: email, OTP: OTP });
    console.log([email, OTP]);

    return res.status(httpStatusCodes.OK).send("Email successfully sent again");
}
