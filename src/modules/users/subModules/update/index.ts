import { NoUserRegistered } from '../../../../errors/index.js';
import type UpdateUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class UpdateUserController implements IAbstractSubController<IUserEntity> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(userId: string, data: UpdateUserDto): Promise<IUserEntity> {
    const exist = await this.repo.get(userId);

    if (!exist) throw new NoUserRegistered();

    await this.repo.update(userId, data);
    return this.repo.get(userId) as Promise<IUserEntity>;
  }
}
