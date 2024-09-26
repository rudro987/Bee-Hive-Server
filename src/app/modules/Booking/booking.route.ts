import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookingsValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingsValidation.bookingValidationSchema),
  BookingControllers.createBookingsForSlots,
);

export const BookingRoutes = router;
