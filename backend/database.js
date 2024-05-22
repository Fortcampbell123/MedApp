import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Database connection established successfully');
        return client;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export default connectDB;
