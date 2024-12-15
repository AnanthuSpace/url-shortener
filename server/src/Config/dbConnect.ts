import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string)
        console.log(`Database Connected`);
    } catch (error) {
        console.log("Database is not connected", error);
    }
}