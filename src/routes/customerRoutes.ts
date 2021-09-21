import express, { Router } from 'express';
import OrderController from '../controllers/orderController';
import AuthController from '../controllers/authController';
import CustomerController from '../controllers/customerController';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const customerController = new CustomerController();
const orderController = new OrderController();
router.use(authController.checkUserToken);
router.use(authController.restrictTo(Role.CUSTOMER));
router.get('/stats', customerController.getUserNumberOfOrders);
router.get('/orders', orderController.getCustomerOrders);
router.get('/followers', customerController.getFollowers);
router.patch('/followers', customerController.addFollowers);

export default router;
