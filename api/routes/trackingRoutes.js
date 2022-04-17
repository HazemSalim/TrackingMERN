import express from "express";
import {
  loadAllFromTrackingsMoreAPI,
  getTrackings,
  getSummary,
} from "../controller/trackingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/load-all", protect, loadAllFromTrackingsMoreAPI);
router.get("/get-trackings", protect, getTrackings);
router.get("/get-summary", protect, getSummary);

export default router;
