import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  const [, token] = authHeader.split(' '); // desestrutura no split informa que vai ter duas variaveis
  // messe caso [type,token], mas como nao irei usar o type, posso deixa-lo vazio, assim o javascript entende
  // que ele nao sera usado e apenas preenche o valor da segunda
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };
    // console.log(decoded);
    /**
      {
        iat: 1598850499,
        exp: 1598936899,
        sub: '01f476a0-412e-4fd9-ac65-ce0289508b60'
      }
     */
    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
