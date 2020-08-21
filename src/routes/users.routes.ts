import { Router } from 'express';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;
