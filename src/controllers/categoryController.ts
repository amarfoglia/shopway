import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { categoryArticle, categoryType } from '../models/category';

class CategoryController {
  getCategories = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      data: { categoryArticle, categoryType }
    });
  });
}

export default CategoryController;
