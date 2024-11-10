import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { RoomRoutes } from "../modules/Room/room.route";
import { SlotRoutes } from "../modules/Slot/slot.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { UserBookingRoutes } from "../modules/User's Booking/userBooking.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/rooms',
        route: RoomRoutes
    },
    {
        path: '/slots',
        route: SlotRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/my-bookings',
        route: UserBookingRoutes
    },
    {
        path: '/all-users',
        route: UserRoutes
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;