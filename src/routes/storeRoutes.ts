import express, { Router } from 'express';
// import AuthController from '../controllers/authController';
import SellerController from '../controllers/sellerController';

const router: Router = express.Router();
// const authController = new AuthController();
const sellerController = new SellerController();

router.put('/:id', sellerController.updateStore);
router.post('/users/:id/stores', sellerController.addStore);

export default router;
