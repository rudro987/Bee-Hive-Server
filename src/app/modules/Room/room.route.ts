import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidation } from "./room.validation";
import { RoomControllers } from "./room.controller";
import { USER_ROLE } from "../User/user.constant";
import auth from "../../middlewares/auth";

const router = Router();

router.post('/', auth(USER_ROLE.admin), validateRequest(RoomValidation.roomValidationSchema), RoomControllers.createRoom);

export const RoomRoutes = router;