import express from "express";
import systemRouter from "./system.route.js";
import authRouter from "./auth.route.js";

const router = express.Router();

// Routes
router.use("/", systemRouter);
router.use("/v1/auth", authRouter);

export default router;
