import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../service/CreateUserService';

const upload = multer(uploadConfig);
const usersRouter = Router();
/**
 * upload
 * .any <--- o any informa que pode ser qualquer um desses abaixo
 * .array  <--- significa que vai receber varios arquivos
 * .none  <--- significa que nao vai receber uploads
 * .single <--- upload de um unico arquivo
 */

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, name, password });

    // Deletando retorno do user.password para quando exibir o user, ele nao mostrar o password
    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // dentro do single, é o nome do campo que a rota vai receber a imagem, nesse caso vamos passar por body um campo chamado 'avatar'.
  async (req, res) => {
    console.log(req.file);
    return res.json('ok');
  },
);

export default usersRouter;
