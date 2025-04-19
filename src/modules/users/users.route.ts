import { Router } from "express";
import { signIn, signUp, getMe } from "./users.handler";
import { validateRequest } from "../../middlewares/validation.middleware";
import { signInBodySchema, signUpBodySchema } from "./users.validation";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();

router.route("/sign-up").post([validateRequest(signUpBodySchema)], signUp);
router.route("/sign-in").post([validateRequest(signInBodySchema)], signIn);
router.route("/me").get([verifyToken], getMe);

export default router;
