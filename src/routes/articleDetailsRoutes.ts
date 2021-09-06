import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import ArticleDetailsController from '../controllers/articleDetailsController';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const articleDetailsController = new ArticleDetailsController();

router.use(authController.checkUserToken);
router.get('/', articleDetailsController.getAllRetailArticles);
router.get('/:id', articleDetailsController.getRetailArticle);

router.use(authController.restrictTo(Role.SELLER));
router.post('/', articleDetailsController.addRetailArticle);
router.patch('/:id', articleDetailsController.updateRetailArticle);
router.delete('/:id', articleDetailsController.deleteRetailArticle);

export default router;
