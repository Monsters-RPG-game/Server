import * as errors from '../../../../errors/index.js';
import type AddUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class AddUserController implements IAbstractSubController<IUserEntity> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: AddUserDto): Promise<IUserEntity> {
    const exist = await this.repo.getByLogin(data.login);

    if (exist) throw new errors.UserAlreadyRegistered();

    const userId = await this.repo.add(data);

    return this.repo.get(userId.id) as Promise<IUserEntity>;
  }
}
