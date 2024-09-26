import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookingsValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import noDataFound from '../../middlewares/noDataFound';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingsValidation.bookingValidationSchema),
  BookingControllers.createBookingsForSlots,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings, noDataFound);

router.put('/:bookingId', auth(USER_ROLE.admin), validateRequest(BookingsValidation.updateValidationSchema), BookingControllers.updateBooking);

router.delete('/:bookingId', auth(USER_ROLE.admin), BookingControllers.deleteBooking);

export const BookingRoutes = router;
