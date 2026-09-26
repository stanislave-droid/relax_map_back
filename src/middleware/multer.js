import createHttpError from 'http-errors';
import multer from 'multer';

export const upload = (fileSizeInMb = 2, allowedTypes = ['image/']) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: fileSizeInMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          createHttpError(
            400,
            `Invalid file type. Only ${
              allowedTypes[0] == 'image/'
                ? 'JPEG JPG PNG WEBP GIF'
                : allowedTypes
                    .map((value) => value.split('/')[1])
                    .join(' ')
                    .toUpperCase()
            } are allowed`,
          ),
          false,
        );
      }
    },
  });
