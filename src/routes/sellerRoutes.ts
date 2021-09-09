import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import SellerController from '../controllers/sellerController';
import articleRouter from './articleRoutes';
import orderRouter from './orderRoutes';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const sellerController = new SellerController();

router.use('/:id/articles', articleRouter);
router.use('/:id/orders', orderRouter);

router.use(authController.checkUserToken);
router.get('/', sellerController.getAllSellers);
router.get('/:id', sellerController.getSeller);

// restrict to Seller
router.use(authController.restrictTo(Role.SELLER));
router.patch('/:id', sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);

export default router;
