import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectToDatabase() {
  try {
    const mongoURI = process.env.MONGO_URI || "";

    await mongoose.connect(mongoURI);
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error connecting to Database:", error);
  }
}
