import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidation } from "./room.validation";
import { RoomControllers } from "./room.controller";
import { USER_ROLE } from "../User/user.constant";
import auth from "../../middlewares/auth";
import noDataFound from "../../middlewares/noDataFound";

const router = Router();

router.post('/', auth(USER_ROLE.admin), validateRequest(RoomValidation.roomValidationSchema), RoomControllers.createRoom);

router.get('/', RoomControllers.getAllRooms, noDataFound);

router.get('/:roomId', RoomControllers.getSingleRoom);

router.patch('/:roomId', auth(USER_ROLE.admin), validateRequest(RoomValidation.updateRoomValidationSchema),RoomControllers.updateRoom);

router.delete('/:roomId', auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;