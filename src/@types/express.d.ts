declare namespace Express {
  export interface Request {
    // Aqui ele não fara uma substituição, e sim um anexo. ou seja ele vai pegar oque estou criando
    // e acrescentar a tipagem
    user: {
      id: string;
    };
  }
}
