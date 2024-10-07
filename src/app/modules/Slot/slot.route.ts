import { Router } from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidation } from './slot.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import noDataFound from '../../middlewares/noDataFound';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.slotCreationValidationSchema),
  SlotControllers.createSlots
);

router.get('/availability', SlotControllers.getAlllRooms, noDataFound);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  SlotControllers.deleteSlot
);

export const SlotRoutes = router;
