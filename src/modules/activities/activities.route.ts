import { Router } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  attendActivity,
} from "./activities.handler";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.use(verifyToken);

router.route("/").get(getActivities).post(createActivity);

router
  .route("/:id")
  .get(getActivityById)
  .patch(updateActivity)
  .delete(deleteActivity);

router.route("/:id/attend").get(attendActivity);

export default router;
