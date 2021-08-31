import express, { Router } from 'express';
// import AuthController from '../controllers/authController';
import ArticleController from '../controllers/articleController';

const router: Router = express.Router();
// const authController = new AuthController();
const articleController = new ArticleController();

router.post('/stores/:idStore/articles/', articleController.addArticle);

export default router;
