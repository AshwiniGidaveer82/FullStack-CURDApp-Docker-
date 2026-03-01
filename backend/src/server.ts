import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = 5000;
const MONGO_URL = process.env.MONGO_URL as string;

mongoose.connect(MONGO_URL).then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});