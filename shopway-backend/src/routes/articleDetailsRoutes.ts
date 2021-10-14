import express, { Router } from 'express';
import AuthController from '../controllers/authController';
import ArticleDetailsController from '../controllers/articleDetailsController';
import Role from '../models/role';
import ImageController from '../controllers/helpers/imageController';

const router: Router = express.Router({ mergeParams: true });
const authController = new AuthController();
const articleDetailsController = new ArticleDetailsController();
const imageController = new ImageController();

router.use(authController.checkUserToken);
router.get('/', articleDetailsController.getAllArticlesDetails);
router.get('/:id', articleDetailsController.getArticleDetails);

router.use(authController.restrictTo(Role.SELLER));
router.post('/',
  imageController.uploadPhoto,
  imageController.resizePhoto(false),
  articleDetailsController.addArticleDetails);
router.patch('/:id',
  imageController.uploadPhoto,
  imageController.resizePhoto(false),
  articleDetailsController.updateArticleDetails);
router.delete('/:id', articleDetailsController.deleteArticleDetails);

export default router;
