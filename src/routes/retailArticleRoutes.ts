import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import RetailArticleController from '../controllers/retailArticleController';
import Role from '../models/role';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const retailArticleController = new RetailArticleController();

router.use(authController.checkUserToken);
router.get('/', retailArticleController.getAllRetailArticles);
router.get('/:idRetailArticle', retailArticleController.getRetailArticle);

router.use(authController.restrictTo(Role.SELLER));
router.post('/', retailArticleController.addRetailArticle);
router.patch('/:idRetailArticle', retailArticleController.updateRetailArticle);
router.delete('/:idRetailArticle', retailArticleController.deleteRetailArticle);

export default router;
