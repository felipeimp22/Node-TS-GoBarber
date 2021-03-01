import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'temp'), // __dirname faz com que voce se refira ao caminho aonde esta chamando o path
    // filename:   //o filename por padrão salva com o nome que é passado por upload, mas isso pode dar problema se existir diversos uploads com o mesmo nome
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
