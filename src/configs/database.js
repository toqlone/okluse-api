import mongoose from "mongoose";
import env from "./env.js";

// Monitor MongoDB connection lifecycle.
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB connection error. ${error.message}`);
});

export const connectDb = async () => {
  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 1000 * 10,
  });

  console.log("MongoDB connected successfully");
};

export const disconnectDb = async () => {
  await mongoose.connection.close();

  console.log("MongoDB connection closed");
  return;
};
