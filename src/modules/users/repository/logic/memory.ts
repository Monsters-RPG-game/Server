import { RepositoryMemoryFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../types.js';

export default class UserMemoryRepository
  extends RepositoryMemoryFactory<enums.EControllers.Users>
  implements IUserRepository
{
  async getByLogin(_data: string): Promise<IUserEntity | null> {
    return new Promise((resolve) => {
      resolve({ login: '', id: 0 });
    });
  }
}
