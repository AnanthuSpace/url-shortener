import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { IUserRepository } from "../Interfaces/userRepository.interface"
import { IUserService } from "../Interfaces/userService.interface"
import { IUserData } from "../Interfaces/common.interface";
import { sendMail } from "../Config/nodeMailer";

export class UserService implements IUserService {
    private _userRepository: IUserRepository;

    constructor(_userRepository: IUserRepository) {
        this._userRepository = _userRepository
    }

    private otpStore: { [key: string]: { otp: string; timestamp: number; userData: IUserData } } = {};

    storeOtp(email: string, otp: string, userData: IUserData) {
        const timestamp = Date.now();
        this.otpStore[email] = { otp, timestamp, userData };
        console.log("Stored OTP data: ", this.otpStore);
    }

    registerUserService = async (userData: IUserData) => {
        try {
            const alreadyExists = await this._userRepository.findUser(userData.email);

            if (alreadyExists) {
                return "UserExist";
            }

            const OTP: string = Math.floor(1000 + Math.random() * 9000).toString();

            const isMailSended = await sendMail(userData.email, OTP);
            if (isMailSended) {
                this.storeOtp(userData.email, OTP, userData);
                return OTP;
            } else {
                return "OTP not sent";
            }
        } catch (error) {
            throw error;
        }
    }
}
