import { NextFunction, Express, Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const multerStorage = multer.memoryStorage();

const multerFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const isAnImage = file.mimetype.startsWith('image');
  const error = isAnImage ? null : new AppError('Not an image! Please upload only images.', 400);
  if (error) cb(error); else cb(null, isAnImage);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as any;
  if (customReq.file) {
    const { file } = customReq;
    file.filename = `user-${customReq.user.id}-${Date.now()}.jpeg`;

    await sharp(file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${file.filename}`);
  }

  next();
});

export { uploadUserPhoto, resizeUserPhoto };
