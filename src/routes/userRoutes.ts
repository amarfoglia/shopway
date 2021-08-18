import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';

const router: Router = express.Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.checkUserToken, authController.updatePassword);

router.patch('/updateMe', authController.checkUserToken, userController.updateMe);
router.delete('/deleteMe', authController.checkUserToken, userController.deleteMe);

router
  .route('/')
  .get(authController.checkUserToken, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(
    authController.checkUserToken,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

export default router;
