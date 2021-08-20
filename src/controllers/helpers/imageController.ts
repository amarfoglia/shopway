import {
  NextFunction, Express, Request, Response
} from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/appError';

const storage = multer.memoryStorage();

const fileFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const isAnImage = file.mimetype.startsWith('image');
  const error = isAnImage ? null : new AppError('Not an image! Please upload only images.', 400);
  if (error) cb(error); else cb(null, isAnImage);
};

const upload = multer({ storage, fileFilter });

class UserImageController {
  uploadUserPhoto = upload.single('photo');

  resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const customReq = req as any;
    if (req.file) {
      const { file } = req;
      file.filename = `user-${req.user?.id}-${Date.now()}.jpeg`;

      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${file.filename}`);
    }

    next();
  });
}

export default UserImageController;
