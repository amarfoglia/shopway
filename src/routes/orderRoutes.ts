import express, { Router } from 'express';
import OrderController from '../controllers/orderController';
import AuthController from '../controllers/authController';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const orderController = new OrderController();

router.use(authController.checkUserToken);
router.delete('/:id', orderController.deleteOrder);
router.get('/:id', orderController.getOrder);
router.patch('/:id', authController.restrictTo(Role.SELLER), orderController.updateOrder);

router.use(authController.restrictTo(Role.CUSTOMER));
router.post('/', orderController.addOrder);
export default router;
