import connectDB from './backend/database.js';

connectDB()
    .then(() => console.log('Test: MongoDB connection successful'))
    .catch((error) => console.log('Test: MongoDB connection failed', error));
