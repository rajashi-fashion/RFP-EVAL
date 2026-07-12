const mongoose = require('mongoose');
require('dotenv').config();
 const connectDB = async () => {
    try {
        // Pool size manages concurrent connections automatically
        await mongoose.connect(process.env.MONGO_URI,{
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection lost. Attempting to reconnect...');
});

module.exports = connectDB;