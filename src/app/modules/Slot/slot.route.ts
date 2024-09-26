import { Router } from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidation } from './slot.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.slotCreationValidationSchema),
  SlotControllers.createSlots,
);

router.get('/availability', SlotControllers.getAlllRooms);

export const SlotRoutes = router;
