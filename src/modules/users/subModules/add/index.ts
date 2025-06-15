import Log from 'simpl-loggar';
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

    Log.debug('Test', 'Does user exist in add ?');
    Log.debug('Test', exist);

    // This is really stupid, but ci/cd for some reason cannot remove data from db. Fix it later...
    if ((exist?.id?.toString()?.length ?? 0) > 0) throw new errors.UserAlreadyRegistered();

    return this.repo.add(data);
  }
}
