import { IUrl, IUserData } from "./common.interface";

export interface IUserService {
    registerUserService(userData: IUserData): Promise< any>;
    otpVerification(email: string, otp: string): Promise<any>;
    login(email: string, otp: string): Promise<any>;
    getUrls(userId: string): Promise<any>
    addUrl(userId: string, longUrl: string): Promise<any>
    redirectUrl(shortUrl: string, userId: string): Promise<any>
}