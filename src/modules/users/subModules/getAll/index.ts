import type GetUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class GetUserController implements IAbstractSubController<IUserEntity[]> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: GetUserDto): Promise<IUserEntity[]> {
    return this.repo.getAll(data.page);
  }
}
