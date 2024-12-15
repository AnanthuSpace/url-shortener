import { Request, response, Response } from "express";
import { IUserService } from "../Interfaces/userService.interface";

export class UserController {
    private _userService: IUserService;

    constructor(_userService: IUserService){
        this._userService = _userService
    }

    registration = async(req: Request,res: Response) => {
        try {
            const userData = req.body;
            const serviceResponse = await this._userService.registerUserService(userData);
            console.log("hiiiiiiiiiiiiiii",serviceResponse)
        } catch (error) {
            console.log(error)
        }
    }
}