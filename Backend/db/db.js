const mongoose = require('mongoose');

// MongoDB URIs for two databases
const MONGODB_URI_MAIN = 'mongodb+srv://abhishekkaratagi:v4d3V2IGjA9q0qqe@cluster0.p6u7s.mongodb.net/test';
// const MONGODB_URI_PENDING = 'mongodb+srv://abhishekkaratagi:v4d3V2IGjA9q0qqe@cluster0.p6u7s.mongodb.net/pending';

const connect = async (app) => {
    try {
        const mainDbConnection = await mongoose.connect(MONGODB_URI_MAIN);

        // Start the server only after both databases are connected
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });

        // Optional: Return connections if you need to use them elsewhere
        return {
            mainDbConnection,
        };

    } catch (error) {
        console.error("Error connecting to databases:", error);
        process.exit(1);
    }

    // Handle connection errors after the initial connection
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected. Trying to reconnect...');
    });
};

module.exports = connect;
