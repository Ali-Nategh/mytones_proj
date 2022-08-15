import otpGenerator from 'otp-generator';

const OTP_LENGTH = 6
const OTP_CONFIG = {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false
}

export default function generateOTP() {
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
    return OTP;
}
