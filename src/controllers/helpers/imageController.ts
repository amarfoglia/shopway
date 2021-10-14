import {
  NextFunction, Express, Request, Response
} from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { promises } from 'fs';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/appError';

const { access, mkdir } = promises;

const storage = multer.memoryStorage();

const fileFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const isAnImage = file.mimetype.startsWith('image');
  const error = isAnImage ? null : new AppError('Not an image! Please upload only images.', 400);
  if (error) cb(error); else cb(null, isAnImage);
};

const upload = multer({ storage, fileFilter });

class ImageController {
  uploadPhoto = upload.single('photo');

  resizePhoto = (isAvatar: boolean) => catchAsync(async (req: Request, res: Response,
    next: NextFunction) => {
    if (req.file) {
      const { file } = req;
      const options = isAvatar ? { height: 500, width: 500 } : {
        fit: sharp.fit.contain,
        width: 800
      };
      req.file = await sharp(file.buffer)
        .toFormat('png')
        .png({ quality: 80 })
        .resize(options);
    }
    next();
  });
}

const setPhoto = async (fileName: string, filepath: string, file: any): Promise<string> => {
  const myFileName = fileName.concat('.png');
  try {
    await access(filepath);
  } catch (err) {
    await mkdir(filepath);
  }
  return file.toFile(`${filepath}/${myFileName}`).then(() => myFileName);
};

export { setPhoto };
export default ImageController;
