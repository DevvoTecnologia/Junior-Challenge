import "dotenv/config";
import mongoose from "mongoose";

const connectToDatabase = async () => {
  const mongoUri = process.env.DATABASE_URL as string;
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connectToDatabase;
