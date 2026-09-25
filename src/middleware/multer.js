import createHttpError from 'http-errors';
import multer from 'multer';

export const upload = (fileSizeInMb = 2, allowedTypes = ['image/']) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: fileSizeInMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const allowedType = allowedTypes;

      if (file.mimetype.startsWith(allowedType)) {
        cb(null, true);
      } else {
        cb(
          createHttpError(
            400,
            'Invalid file type. Only JPEG JPG PNG WEBP GIF are allowed',
          ),
          false,
        );
      }
    },
  });
