import express from "express";
import { downloadIcalFile } from "../controller/icalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, downloadIcalFile);

export default router;
