import mongoose from 'mongoose';
// import dotenv from "dotenv"

// dotenv.config()

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect("mongodb://127.0.0.1:27017/phone-store");
        // console.log("Printing Connection Below");
        // console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error Connectint to MongoDB ${error.message}`);

        process.exit(1); // Exit the process with failure
    }
};


export default connectDB;
