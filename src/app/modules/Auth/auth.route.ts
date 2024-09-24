import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../User/user.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post('/signup', validateRequest(UserValidations.userValidationSchema), AuthControllers.signUpUser);

// router.get('/', moduleControllers.getAllModuleName);

// router.get('/:id', moduleControllers.getSingleModuleName);

// router.patch('/:id', moduleControllers.updateModuleName);

// router.delete('/:id', moduleControllers.deleteModuleName);

export const AuthRoutes = router;