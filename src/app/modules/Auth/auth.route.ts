import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { UserValidations } from "../User/user.validation";

const router = Router();

router.post('/signup', validateRequest(UserValidations.userValidationSchema), AuthControllers.signUpUser);

export const AuthRoutes = router;