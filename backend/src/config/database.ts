import mongoose from "mongoose";
import { Env_Consts } from "../constants/envConsts";

const connectDB = async () => {
    try {
        if (!Env_Consts.CONNECTION_STRING) {
            throw new Error("Connection string is not defined in the environment variables.");
        }

        await mongoose.connect(Env_Consts.CONNECTION_STRING);
        console.log("Database Connected");
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Failed to connect to database: ${error.message}`);
        } else {
            console.log("Failed to connect to database: Unknown error");
        }
        process.exit(1);
    }
};

export default connectDB;
