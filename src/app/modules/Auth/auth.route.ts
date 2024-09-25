import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { UserValidations } from "../User/user.validation";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post('/signup', validateRequest(UserValidations.userValidationSchema), AuthControllers.signUpUser);

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

export const AuthRoutes = router;