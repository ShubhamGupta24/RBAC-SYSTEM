const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("database connection fail", error.message);
        process.exit(0);
    }
};

module.exports = connectDb;