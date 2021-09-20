import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import ArticleController from '../controllers/articleController';
import articleDetailsRouter from './articleDetailsRoutes';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const articleController = new ArticleController();

router.use('/:id/details', articleDetailsRouter);

router.use(authController.checkUserToken);

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticle);

// router.get('/', articleController.getArticleDisplay);

router.use(authController.restrictTo(Role.SELLER));
router.post('/', articleController.addArticle);
router.delete('/:id', articleController.deleteArticle);
router.patch('/:id', articleController.updateArticle);
export default router;
