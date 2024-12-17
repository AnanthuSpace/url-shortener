import { IUrl, IUser } from "./common.interface";

export interface IUserRepository {
    findUser(email: string): Promise<IUser | null>;
    registerUserRepository(userData: Omit<IUser, "_id" | "urls">): Promise<IUser>;
    getUrls(userId: string): Promise<IUrl>
    addUrl(userId: string, longUrl: string): Promise<any>
    findUrl(shortUrl: string, userId: string): Promise<any>
}
