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

class ImageController {
  uploadPhoto = upload.single('photo');

  resizePhoto = catchAsync(async (req: Request, res: Response,
    next: NextFunction) => {
    if (req.file) {
      const { file } = req;
      const loadedFile = await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 });
      req.file = loadedFile;
    }
    next();
  });
}
const setPhoto = async (key: string, names: string[],
  filepath: string, req:Request, next: NextFunction): Promise<string> => {
  let filename: string = key;
  names.forEach((e) => {
    filename += `-${e}`;
  });
  filename += '.jpeg';
  try {
    await req.file?.toFile(`${filepath}/${filename}`);
  } catch (err) {
    next(new AppError(`impossible to save the file: ${err} `, 500));
    return ' ';
  }
  return filename;
};
export { setPhoto };
export default ImageController;
