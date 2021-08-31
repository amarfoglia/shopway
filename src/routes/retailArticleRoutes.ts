import express, { Router } from 'express';
// import AuthController from '../controllers/authController';
import RetailArticleController from '../controllers/retailArticleController';

const router: Router = express.Router();
// const authController = new AuthController();
const retailArticleController = new RetailArticleController();

router.post('/articles/:idArticle/retails', retailArticleController.addRetailArticle);

export default router;
