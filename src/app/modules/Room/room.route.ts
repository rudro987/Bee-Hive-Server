import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidation } from "./room.validation";
import { RoomControllers } from "./room.controller";

const router = Router();

router.post('/', validateRequest(RoomValidation.roomValidationSchema), RoomControllers.createRoom);

export const RoomRoutes = router;