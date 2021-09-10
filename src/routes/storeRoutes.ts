import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import StoreController from '../controllers/storeController';
import Role from '../models/role';
import UserController from '../controllers/userController';
import articleRouter from './articleRoutes';
import OrderController from '../controllers/orderController';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const storeController = new StoreController();
const userController = new UserController();
const orderController = new OrderController();

router.use('/:id/articles', articleRouter);

router.use(authController.checkUserToken);
router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStore);
router.get('/:id/stats', orderController.getStoreSalesPerDay);
router.get('/:id/stats/mostpopular', orderController.getStorePopularProducts);
// restrict to Seller
router.use(authController.restrictTo(Role.SELLER), userController.getMe);
router.patch('/:id', storeController.updateStore);
router.post('/', storeController.addStore);
router.delete('/:id', storeController.deleteStore);

export default router;
