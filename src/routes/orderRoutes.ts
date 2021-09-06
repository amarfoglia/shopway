import express, { Router } from 'express';
import OrderController from '../controllers/orderController';
import AuthController from '../controllers/authController';
import Role from '../models/role';
import UserController from '../controllers/userController';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const orderController = new OrderController();
const userController = new UserController();

router.use(authController.checkUserToken);
router.use(authController.restrictTo(Role.CUSTOMER));
router.use(userController.getMe);

// get all orders of customer
router.get('/', orderController.getAllOrders);
// get one order of customer
router.get('/:id', orderController.getOrder);
// add order to customer
router.post('/', orderController.addOrder);

export default router;
