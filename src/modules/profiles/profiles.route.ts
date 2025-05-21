import { Router } from "express";
import { getProfileById, uploadPhotoHandler } from "./profiles.handler";
import { verifyToken } from "../../middlewares/auth.middleware";
import { upload } from "../upload.handler";
const router = Router();

router.use(verifyToken);

router.route("/:id").get(getProfileById);
router.route("/photo").post([upload.single("file")], uploadPhotoHandler);

export default router;
