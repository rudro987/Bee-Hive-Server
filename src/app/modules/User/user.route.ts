import { Router } from "express";
import noDataFound from "../../middlewares/noDataFound";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAlllUsers, noDataFound);

router.put('/:userId', auth(USER_ROLE.admin), validateRequest(UserValidations.updateUserRoleValidationSchema), UserControllers.updateUserRole);

export const UserRoutes = router;