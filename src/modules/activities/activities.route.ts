import { Router } from "express";
import { getActivities, getActivityById } from "./activities.handler";

const router = Router();

router.get("/", getActivities);
router.get("/:id", getActivityById);

export default router;
