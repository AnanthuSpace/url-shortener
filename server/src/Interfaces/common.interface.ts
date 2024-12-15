import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
    userId: string;
    email: string;
    password: string;
    urls: [IUrl]
}

export interface IUrl {
    shortUrl: string;
    longUrl: string;
    createdAt: Date;
}

export interface IUserData {
    email: string;
    password: string;
}