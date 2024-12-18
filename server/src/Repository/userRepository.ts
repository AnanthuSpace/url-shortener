import { Model } from "mongoose";
import { IUser } from "../Interfaces/common.interface";
import { IUserRepository } from "../Interfaces/userRepository.interface";
import shortid from "shortid"

export class UserRepository implements IUserRepository {
    private _userModel: Model<IUser>;

    constructor(userModel: Model<IUser>) {
        this._userModel = userModel;
    }

    findUser = async (email: string): Promise<IUser | null> => {
        return await this._userModel.findOne({ email: email }, { _id: 0 }).lean();
    }

    registerUserRepository = async (userData: IUser): Promise<IUser> => {
        try {
            const createdUser = await this._userModel.create(userData);
            return createdUser;
        } catch (error: any) {
            throw new Error(`Error while registering user: ${error.message}`);
        }
    };

    getUrls = async (userId: string): Promise<any> => {
        try {
            const res = await this._userModel.aggregate([
                { $match: { userId: userId } },
                {
                    $project: {
                        _id: 0,
                        urls: { $reverseArray: "$urls" },
                    },
                }
            ])
            if (res.length === 0) {
                throw new Error("User not found or no URLs available");
            }
            return res[0].urls;
        } catch (error: any) {
            throw new Error(`Error while registering user: ${error.message}`);
        }
    }

    addUrl = async (userId: string, longUrl: string): Promise<any> => {
        try {
            const shortUrl = shortid.generate();
            const user = await this._userModel.findOne({ userId });

            if (!user) {
                throw new Error("User not found");
            }

            const newUrl = {
                shortUrl,
                longUrl,
                clicks: 0,
                createdAt: new Date(),
            };

            user.urls.push(newUrl);

            await user.save();

            return newUrl;
        } catch (error: any) {
            throw new Error(`Error while adding URL: ${error.message}`);
        }
    };

    findUrl = async (shortUrl: string, userId: string) => {
        const result = await this._userModel.aggregate([
            { $match: { userId: userId } },
            { $unwind: "$urls" },
            { $match: { "urls.shortUrl": shortUrl } },
            { $project: { "urls.longUrl": 1 } }
        ])
        if (result.length > 0) {
            const originalUrl = result[0].urls.longUrl;
            return originalUrl;
        } else {
            throw new Error("Short URL not found");
        }
    }

    editUrl = async (userId: string, shortUrl: string, longUrl: string): Promise<any> => {
        try {

            const result = await this._userModel.updateOne(
                { userId, "urls.shortUrl": shortUrl },
                { $set: { "urls.$.longUrl": longUrl } }
            );
            return result
        } catch (error) {
            throw new Error("Short URL not found");
        }
    }

    deleteUrl = async (userId: string, shortUrl: string): Promise<any> => {
        try {
            const res = await this._userModel.updateOne(
                { userId },
                { $pull: { urls: { shortUrl } } }
            )

            return res.modifiedCount > 0;
        } catch (error) {
            throw new Error("Short URL not found");
        }
    }

}
