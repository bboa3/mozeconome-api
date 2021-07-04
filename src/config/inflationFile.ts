import multer, {FileFilterCallback} from 'multer';
import path from 'path';
import { Request } from 'express';
import InflationFilename from '../validations/inflationFile';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'files'),
    filename: (request, file, cb) => {

      const fileName = file.originalname.toLowerCase()

      cb(null, fileName);
    }
  }),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: function(rep: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    
    const allowedMimes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ]

    if(!InflationFilename.validator(file.originalname)) {
      cb(null, false);

      return cb(
        new Error('Filename invalid. Valid filename example: maputo-2021.xlsx')
      );
    }

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false);
      return cb(
        new Error('Invalid file type. Only xlsx and xls are acceptable.')
      );
    }
  }
}