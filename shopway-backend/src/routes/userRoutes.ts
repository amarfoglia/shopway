import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import ImageController from '../controllers/helpers/imageController';
import NotificationController from '../controllers/notificationController';

import storeRouter from './storeRoutes';

const router: Router = express.Router();
const userController = new UserController();
const authController = new AuthController();
const imageController = new ImageController();
const notificationController = new NotificationController();
router.use('/:id/stores', storeRouter);
router.post('/signup',
  imageController.uploadPhoto,
  imageController.resizePhoto(true),
  authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.checkUserToken);
router.get('/notifications', notificationController.getNotificationsOfUser);
router.patch('/notifications/:id', notificationController.updateNotificationsOfUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  imageController.uploadPhoto,
  imageController.resizePhoto(true),
  userController.updateMe
);

router
  .route('/:id')
  .get(userController.getUser);

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
