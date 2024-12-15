import { IUser } from "./common.interface";

export interface IUserRepository {
    findUser(email: string): Promise<IUser | null>
    registerUserRepository(userData: Omit<IUser, "_id">): Promise<IUser>
}