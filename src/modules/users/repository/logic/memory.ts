import AbstractRepository from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../types.js';

export default class UserMemoryRepository
  extends AbstractRepository<enums.EControllers.Users>
  implements IUserRepository
{
  async getByLogin(_data: string): Promise<IUserEntity | null> {
    return new Promise((resolve) => {
      // Getting data by login
      resolve({ login: '', _id: '' });
    });
  }
}
