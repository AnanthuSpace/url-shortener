import { Request, response, Response } from "express";
import { IUserService } from "../Interfaces/userService.interface";
import HTTP_statusCode from "../Enums/httpStatusCode";

interface CustomRequest extends Request {
    id?: string;
}

export class UserController {
    private _userService: IUserService;

    constructor(_userService: IUserService) {
        this._userService = _userService
    }

    registration = async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            await this._userService.registerUserService(userData);
            res.status(HTTP_statusCode.OK).send("OTP sended to mail");
        } catch (error: any) {
            console.log(error)
            if (error.message === "Email already exists") {
                res.status(HTTP_statusCode.Conflict).json({ message: "Email already exists" });
            } else if (error.message === "Email not send") {
                res.status(HTTP_statusCode.InternalServerError).json({ message: "Email not send" });
            } else {
                res.status(HTTP_statusCode.InternalServerError).json({ message: "Something wrong please try again later" });
            };
        }
    }

    otpVerification = async (req: Request, res: Response) => {
        try {
            const { otp, email } = req.body
            const serviceResponse = await this._userService.otpVerification(email, otp);
            if (serviceResponse.message === "OTP verified") {
                res.status(HTTP_statusCode.OK).json(serviceResponse);
            } else {
                res.status(HTTP_statusCode.BadRequest).json(serviceResponse);
            }
        } catch (error) {
            if (error == "OTP expired") {
                res.status(HTTP_statusCode.Expired).json("OTP expired")
            } else if (error == "Invalid OTP") {
                res.status(HTTP_statusCode.InternalServerError).json("Invalid OTP")
            } else {
                res.status(HTTP_statusCode.InternalServerError).json({ message: 'Internal server error' });
            }
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const serviceResponse = await this._userService.login(email, password)
            res.status(HTTP_statusCode.OK).json(serviceResponse)
        } catch (error) {
            if (error == "Invalid email or user not found") {
                res.status(HTTP_statusCode.BadRequest).json({ message: "Invalid email or user not found" })
            }
        }
    }

    getUrls = async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            const userId = req.id as string
            const serviceResponse = await this._userService.getUrls(userId)
            res.status(HTTP_statusCode.OK).json(serviceResponse)
        } catch (error) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    };

    addUrl = async (req: CustomRequest, res: Response) => {
        try {
            const userId = req.id as string
            const { url } = req.body
            const serviceResponse = await this._userService.addUrl(userId, url)
            res.status(HTTP_statusCode.OK).json(serviceResponse)
        } catch (error) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }

    redirectUrl = async (req: CustomRequest, res: Response) => {
        try {
            const userId = req.id as string
            const shortUrl = req.query.shortUrl as string
            const serviceResponse = await this._userService.redirectUrl(shortUrl, userId)
            res.status(HTTP_statusCode.OK).json(serviceResponse)
        } catch (error) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }

}