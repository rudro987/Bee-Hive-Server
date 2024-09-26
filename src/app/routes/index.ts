import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { RoomRoutes } from "../modules/Room/room.route";
import { SlotRoutes } from "../modules/Slot/slot.route";

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
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;