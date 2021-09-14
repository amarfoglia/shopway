import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import CustomerController from '../controllers/customerController';
import orderRouter from './orderRoutes';
import Role from '../models/role';
import UserController from '../controllers/userController';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const customerController = new CustomerController();
const userController = new UserController();

router.use('/:id/orders', orderRouter);
// restrict to logged user
router.use(authController.checkUserToken);
// restrict to customer and only if id of customer match with what he request.
router.use(authController.restrictTo(Role.CUSTOMER), userController.getMe);
// router.get('/', customerController.getCustomer);

router.get('/followers', customerController.getFollowers);
router.patch('/followers', customerController.addFollowers);
// router.patch('/update', customerController.updateCustomer);
// router.delete('/delete', customerController.deleteCustomer);

export default router;
