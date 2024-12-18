import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { IUserRepository } from "../Interfaces/userRepository.interface"
import { IUserService } from "../Interfaces/userService.interface"
import { IUrl, IUserData } from "../Interfaces/common.interface";
import { sendMail } from "../Config/nodeMailer";
import { generateAccessToken, generateRefreshToken } from "../Config/jwtConfig";

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
                throw new Error("UserExist")
            }

            const OTP: string = Math.floor(100000 + Math.random() * 900000).toString();

            const isMailSended = await sendMail(userData.email, OTP);
            if (isMailSended) {
                this.storeOtp(userData.email, OTP, userData);
                return OTP;
            } else {
                throw new Error( "OTP not sent")
            }
        } catch (error) {
            throw error;
        }
    }

    otpVerification = async (email: string, otp: string) => {
        try {

            const storedData = this.otpStore[email];
            if (!storedData) {
                throw new Error("Invalid OTP");
            }

            const currentTime = Date.now();
            const otpTime = storedData.timestamp;
            const difference = currentTime - otpTime;

            if (difference > 2 * 60 * 1000) {
                throw new Error("OTP expired");
            }

            if (storedData.otp !== otp) {
                throw new Error("Invalid OTP");
            }

            const userData = storedData.userData;
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            userData.userId = v4();
            delete this.otpStore[email];

            const data = await this._userRepository.registerUserRepository(userData);
            console.log(data)
            const accessToken = generateAccessToken(userData.userId);
            const refreshToken = generateRefreshToken(userData.userId);
            const { password, ...userDataWithoutSensitiveInfo } = userData;
            return { message: "OTP verified", accessToken, refreshToken, userData: userDataWithoutSensitiveInfo };
        } catch (error) {
            throw error;
        }
    }

    login = async (email: string, password: string) => {
        try {
            const user = await this._userRepository.findUser(email);

            if (!user) {
                throw new Error("Invalid email or user not found");
            }

            const bcryptPass = await bcrypt.compare(password, user.password);
            if (!bcryptPass) {
                throw new Error("Invalid password");
            }

            const accessToken = generateAccessToken(user.userId);
            const refreshToken = generateRefreshToken(user.userId);

            return { accessToken, refreshToken, userData: user };
        } catch (error: any) {
            console.error("Error in user login service:", error);
            throw new Error(error.message || "An error occurred during login");
        }
    }

    getUrls = async (userId: string): Promise<IUrl | any> => {
        try {
            const data = await this._userRepository.getUrls(userId)
            return data
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during getUrls");
        }
    }

    addUrl = async (userId: string, longUrl: string): Promise<any> => {
        try {
            const data = await this._userRepository.addUrl(userId, longUrl)
            return data
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during add urls");
        }
    }

    redirectUrl = async (shortUrl: string, userId: string): Promise<any> => {
        try {
            const mainUrl = await this._userRepository.findUrl(shortUrl, userId)
            return mainUrl
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during add urls");
        }
    }

    editUrl = async (userId: string, shortUrl: string, longUrl: string): Promise<any> => {
        try {
            const editerRes = await this._userRepository.editUrl(userId, shortUrl, longUrl)
            return editerRes
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during add urls");
        }
    }
    deleteUrl = async (userId: string, shortUrl: string): Promise<any> => {
        try {
            const result = await this._userRepository.deleteUrl(userId, shortUrl)
            return result
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during add urls");
        }
    }
}
