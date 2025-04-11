import { Router } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from "./activities.handler";

const router = Router();

router.route("/").get(getActivities);
router
  .route("/:id")
  .get(getActivityById)
  .post(createActivity)
  .patch(updateActivity)
  .delete(deleteActivity);

export default router;
