import type GetUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class GetUserController implements IAbstractSubController<IUserEntity | null> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: GetUserDto): Promise<IUserEntity | null> {
    let user: IUserEntity | null = null;

    if (data.id) user = await this.repo.get(data.id);
    if (data.name) user = await this.repo.getByLogin(data.name);

    return user;
  }
}
