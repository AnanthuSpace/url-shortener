import { model, Schema } from "mongoose";
import { IUser } from "../Interfaces/common.interface";

const UrlSchema = new Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserSchema = new Schema<IUser>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    urls: [UrlSchema],
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
