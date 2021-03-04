import { getRepository } from 'typeorm';
import path from 'path'
import fs from 'fs'

import User from '../models/User';
import uploadConfig from '../config/upload'

interface Request {
  user_id: string,
  avatarFileName: string
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar')
    }
    if (user.avatar) {
      //Deletando avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      // * fs.promises garante que vai estar usando as funções do fs em formato
      // de promises ao inves de callback.
      // * .stat traz o status de um arquivo, só se ele existir.
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        //deleta o arquivo
        await fs.promises.unlink(userAvatarFilePath)
      }

    }
    user.avatar = avatarFileName

    await usersRepository.save(user)

    return user
  }

}

export default UpdateUserAvatarService
