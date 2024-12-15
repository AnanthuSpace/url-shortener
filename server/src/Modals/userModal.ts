import { model, Schema, Types } from "mongoose";
import { IUser } from "../Interfaces/common.interface";

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
    urls: [{
        type: Types.ObjectId,
        ref: "Url" 
    }],
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
