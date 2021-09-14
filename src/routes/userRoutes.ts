import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import ImageController from '../controllers/helpers/imageController';
import sellerRouter from './sellerRoutes';
import storeRouter from './storeRoutes';
import orderRouter from './orderRoutes';
import customerRouter from './customerRoutes';
import CustomerController from '../controllers/customerController';

const router: Router = express.Router();
const userController = new UserController();
const authController = new AuthController();
const imageController = new ImageController();

router.use('/:id/stores', storeRouter);
router.use('/:id/orders', orderRouter);
router.use('/:id/followers', customerRouter);
// router.use('/:id/sellers', sellerRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.checkUserToken);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  imageController.uploadPhoto,
  imageController.resizePhoto,
  userController.updateMe
);

router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
