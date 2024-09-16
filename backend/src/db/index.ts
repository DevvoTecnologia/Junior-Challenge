import mongoose from "mongoose";

const dbUrl =
  "mongodb+srv://DevvoRings:DevvoRings@cluster0.gqatsp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function connectDb() {
  try {
    const connection = await mongoose.connect(dbUrl, { dbName: "DevvoRings" });
    console.log("Connected to database: ", connection.connection.name);
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
