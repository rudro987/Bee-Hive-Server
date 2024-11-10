import { Router } from "express";
import noDataFound from "../../middlewares/noDataFound";
import { UserControllers } from "./user.controller";

const router = Router();

router.get('/', UserControllers.getAlllUsers, noDataFound);

export const UserRoutes = router;