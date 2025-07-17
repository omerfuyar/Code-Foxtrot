import mongoose, { ConnectionStates } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

class DBHandler {
    private constructor() { }

    static Connect = async () => {
        try {
            const MONGO_CONNECTION_STRING: string = String(process.env.MONGO_CS);

            await mongoose.connect(MONGO_CONNECTION_STRING);

            console.log('MongoDB connected successfully.');
        } catch (error) {
            throw new Error(`Failed to connect to MongoDB: ${error}`);
        }
    }
}

export default DBHandler;