import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env");
    throw new Error();
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error();
  }
};

export default connectDB;
