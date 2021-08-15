import express, { Router } from 'express';
import UserController from '../controllers/userController';

const router: Router = express.Router();
const userController: UserController = new UserController();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;