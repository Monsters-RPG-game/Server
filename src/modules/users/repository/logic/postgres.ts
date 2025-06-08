import { RepositoryPostgresFactory } from '../../../../tools/abstractions/repository.js';
import State from '../../../../tools/state.js';
import type * as enums from '../../../../enums/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../types.js';

export default class UserPostgresRepository
  extends RepositoryPostgresFactory<enums.EControllers.Users>
  implements IUserRepository
{
  async getByLogin(login: string): Promise<IUserEntity | null> {
    const data = await State.postgres.getClient()<IUserEntity>(this.target).where('login', login);

    return data.length > 0 ? data[0]! : null;
  }
}
