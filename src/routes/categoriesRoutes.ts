import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import CategoryController from '../controllers/categoryController';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const categoryController = new CategoryController();
// restrict to logged user
router.use(authController.checkUserToken);
// restrict to customer and only if id of customer match with what he request.
// router.get('/', customerController.getCustomer);

router.get('/', categoryController.getCategories);

export default router;
