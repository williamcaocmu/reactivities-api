import { Router } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
} from "./activities.handler";

const router = Router();

router.route("/").get(getActivities);
router.route("/:id").get(getActivityById).post(createActivity);

export default router;
