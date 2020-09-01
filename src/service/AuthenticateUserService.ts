import { getRepository } from 'typeorm';
// import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    // Promise < { user: User } >
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('invalid email or password');
    }
    // user.password = senha criptografada
    // senha que tentou fazer login, não esta criptografada
    const passWordMatched = await compare(password, user.password);
    if (!passWordMatched) {
      throw new Error('invalid email or password');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
