import nodemailer, { Transporter } from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_ID: string = process.env.EMAIL_ID as string;
const EMAIL_PASS: string = process.env.EMAIL_PASS as string;

export const sendMail = async (email: string, otp: string): Promise<boolean> => {
    const otpVerificationUrl = process.env.otpVerificationUrl
    const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ID,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: EMAIL_ID,
        to: email,
        subject: "Verify Your Shortened URL Account",
        html: `
        <div style="font-family: Helvetica, Arial, sans-serif; min-width: 100px; overflow: auto; line-height: 2">
            <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                <p style="font-size: 1.1em">Hi,</p>
                <p>Thank you for using our URL shortener service. Please use the following OTP to complete your account verification process:</p>
                <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${otp}</h2>
                <p style="font-size: 1em; margin-top: 15px;">The OTP is valid for 2 minutes.</p>
                <p style="font-size: 1em; margin-top: 15px;">Click the button below to verify your OTP:</p>
                <a href="${otpVerificationUrl}" style="display: inline-block; background-color: #00466a; color: #fff; padding: 10px 20px; font-size: 16px; border-radius: 5px; text-decoration: none; margin-top: 20px;">Verify OTP</a>
                <p style="font-size: 0.9em;">Regards,<br />URL Shortener Service</p>
                <hr style="border: none; border-top: 1px solid #eee" />
            </div>
        </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP verification mail sent to ${email}`);
        return true;
    } catch (error) {
        console.log("Error in sending OTP mail: ", error);
        return false;
    }
};
