import { Router } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from "./activities.handler";

const router = Router();

router.route("/").get(getActivities).post(createActivity);
router
  .route("/:id")
  .get(getActivityById)
  .patch(updateActivity)
  .delete(deleteActivity);

export default router;
