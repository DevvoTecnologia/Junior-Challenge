import mongoose from 'mongoose';

const uri = "mongodb+srv://root:123@cluster0.gzdru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      serverApi: { version: '1' },
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

connectToDatabase();
