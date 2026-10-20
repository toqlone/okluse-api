import mongoose from "mongoose";

export const getRootMessage = (req, res) => {
  res.status(200).json({ message: "Welcome to Okluse API." });
};

// Liveness: Is the application process running?
export const getHealthLive = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Application is alive.",
  });
};

// Readiness: Can the application serve requests?
export const getHealthReady = (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (!isDbConnected) {
    return res.status(503).json({
      status: "not_ready",
      services: [
        {
          name: "MongoDB",
          status: "unavailable",
        },
      ],
    });
  }

  res.status(200).json({
    status: "ready",
    services: [
      {
        name: "MongoDB",
        status: "available",
      },
    ],
  });
};
