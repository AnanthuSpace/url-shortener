import { IUrl, IUser } from "./common.interface";

export interface IUserRepository {
    findUser(email: string): Promise<IUser | null>;
    registerUserRepository(userData: Omit<IUser, "_id" | "urls">): Promise<IUser>;
    registerThroghGoogle(userId: string, email: string): Promise<any>
    getUrls(userId: string): Promise<IUrl>
    addUrl(userId: string, longUrl: string, alias: string, topic: string): Promise<any>
    checkAlias(userId: string, alias: string): Promise<any>
    findUrl(shortUrl: string, userId: string): Promise<any>
    editUrl(userId: string, shortUrl: string, longUrl: string): Promise<any>
    deleteUrl(userId: string, shortUrl: string): Promise<any>
}
