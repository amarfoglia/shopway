import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import StoreController from '../controllers/storeController';
import Role from '../models/role';
import UserController from '../controllers/userController';
import articleRouter from './articleRoutes';
import ImageController from '../controllers/helpers/imageController';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const storeController = new StoreController();
const userController = new UserController();
const imageController = new ImageController();

router.use('/:id/articles', articleRouter);

router.use(authController.checkUserToken);
router.get('/:storeId', userController.getMe, storeController.getStore);
router.get('/', storeController.getAllStores);
router.get('/:id/stats', storeController.getStoreSalesPerDay);
router.get('/:id/stats/visits', storeController.getWiewsStats);
router.get('/:id/stats/mostpopular', storeController.getStorePopularProducts);
// restrict to Seller
router.use(authController.restrictTo(Role.SELLER), userController.getMe);
router.patch('/:id',
  imageController.uploadPhoto,
  imageController.resizePhoto,
  storeController.updateStore);
router.post('/', imageController.uploadPhoto, imageController.resizePhoto, storeController.addStore);
router.delete('/:id', storeController.deleteStore);

export default router;
