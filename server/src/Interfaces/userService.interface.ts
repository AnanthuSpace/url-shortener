import { IUserData } from "./common.interface";

export interface IUserService {
    registerUserService(userData: IUserData): Promise<string | any>;
}