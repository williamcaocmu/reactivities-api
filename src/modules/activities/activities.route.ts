import { Router } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
} from "./activities.handler";

const router = Router();

router.get("/", getActivities);
router.get("/:id", getActivityById);
router.post("/:id", createActivity);

export default router;
