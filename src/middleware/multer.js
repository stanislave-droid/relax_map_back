import createHttpError from 'http-errors';
import multer from 'multer';

export const upload = (fileSizeInMb = 2) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: fileSizeInMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          createHttpError(
            400,
            'Invalid file type. Only JPEG JPG PNG are allowed',
          ),
          false,
        );
      }
    },
  });
