import type AddUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserRepository } from '../../repository/types.js';

export default class AddUserController implements IAbstractSubController<void> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: AddUserDto): Promise<void> {
    await this.repo.add(data);
  }
}
