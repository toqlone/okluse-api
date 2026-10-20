import mongoose from "mongoose";
import app from "./app.js";
import env from "./configs/env.js";
import { connectDb, disconnectDb } from "./configs/database.js";

const startServer = async () => {
  try {
    await connectDb();

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });

    let shuttingDown = false;

    const shutDown = async (signal) => {
      if (shuttingDown) return;
      shuttingDown = true;

      console.log(`${signal} received. Shutting down...`);

      try {
        // Stop accepting new HTTP connections.
        await new Promise((resolve, reject) => {
          server.close((error) => {
            if (error) reject(error);
            else resolve();
          });
        });

        // Close MongoDB after HTTP traffic has stopped.
        await disconnectDb();

        console.log("Graceful shutdown complete.");
      } catch (error) {
        console.error("Shutdown error:", error.message);
        process.exitCode = 1;
      }
    };

    process.once("SIGTERM", () => shutDown("SIGTERM"));
    process.once("SIGINT", () => shutDown("SIGINT"));
  } catch (error) {
    console.error("Server startup failed.", error.message);

    try {
      await mongoose.disconnect();
    } catch (closeError) {
      console.error("Database cleanup failed.", closeError.message);
    }

    process.exitCode = 1;
  }
};

startServer();
