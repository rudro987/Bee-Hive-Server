import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { UserBookingControllers } from "./userBooking.controller";
import noDataFound from "../../middlewares/noDataFound";

const router = Router();

router.get('/', auth(USER_ROLE.user), UserBookingControllers.getUserBookings, noDataFound)

export const UserBookingRoutes = router;