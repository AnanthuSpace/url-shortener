import { Model } from "mongoose";
import { IUser } from "../Interfaces/common.interface";
import { IUserRepository } from "../Interfaces/userRepository.interface";

export class UserRepository implements IUserRepository {
    private _userModel: Model<IUser>;

    constructor(userModel: Model<IUser>) {
        this._userModel = userModel;
    }

    async findUser(email: string): Promise<IUser | null> {
        return await this._userModel.findOne({ email: email }, { _id: 0 }).lean();
    }

    registerUserRepository = async (userData: IUser): Promise<IUser> => {
        try {
            const createdUser = await this._userModel.create(userData);
            console.log(createdUser)
            return createdUser;
        } catch (error: any) {
            throw new Error(`Error while registering user: ${error.message}`);
        }
    };
}
