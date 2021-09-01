import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import SellerController from '../controllers/sellerController';
import articleRouter from './articleRoutes';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const sellerController = new SellerController();

router.use('/:storeId/articles', articleRouter);

router.use(authController.checkUserToken);
router.get('/', sellerController.getAllStores);
router.get('/:storeId', sellerController.getStore);

// restrict to
router.use(authController.restrictTo(Role.SELLER));
router.patch('/:storeId', sellerController.updateStore);
router.post('/', sellerController.addStore);
router.delete('/:storeId', sellerController.deleteStore);

export default router;
