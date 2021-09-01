import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import ArticleController from '../controllers/articleController';
import retailArticleRouter from './retailArticleRoutes';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const articleController = new ArticleController();

router.use('/:articleId/retails', retailArticleRouter);

router.use(authController.checkUserToken);
router.get('/', articleController.getAllArticles);
router.get('/:articleId', articleController.getArticle);

router.use(authController.restrictTo(Role.SELLER));
router.post('/', articleController.addArticle);
router.delete('/:articleId', articleController.deleteArticle);
router.patch('/:articleId', articleController.updateArticle);
export default router;
