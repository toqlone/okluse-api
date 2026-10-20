import express from "express";
import {
  getRootMessage,
  getHealthLive,
  getHealthReady,
} from "../controllers/system.controller.js";

const router = express.Router();

// Routes
router.get("/", getRootMessage);
router.get("/health/live", getHealthLive);
router.get("/health/ready", getHealthReady);

export default router;
