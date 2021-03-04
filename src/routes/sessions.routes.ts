import { Router } from 'express';
import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();
interface User {
  user: any,
  token: any
}
sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token }: User = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
