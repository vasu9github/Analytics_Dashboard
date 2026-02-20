import express from "express";
import { trackEvent } from "../controllers/track.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/track", protect , trackEvent);

export default router;
