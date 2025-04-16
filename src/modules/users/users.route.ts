import { Router } from "express";
import { signIn, signUp } from "./users.handler";
import { validateRequest } from "../../middlewares/validation.middleware";
import { signInBodySchema, signUpBodySchema } from "./users.validation";

const router = Router();

router.route("/sign-up").post([validateRequest(signUpBodySchema)], signUp);
router.route("/sign-in").post([validateRequest(signInBodySchema)], signIn);

export default router;
