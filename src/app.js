import express from "express";
import session from "express-session";
import apiRouter from "./routes/index.js";
import notFoundHandler from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import sessionConfig from "./configs/session.js";
import limiter from "./middlewares/rate-limit.middleware.js";

const app = express();

// Global middlewares
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(limiter("global"));
app.use(express.json());
app.use(session(sessionConfig));

// Routes
app.use("/api", apiRouter);

// Cental middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
