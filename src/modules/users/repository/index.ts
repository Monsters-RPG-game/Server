import Log from 'simpl-loggar';
import MemoryUserRepository from './logic/memory.js';
import { NoRepositoryControllerSpecified } from '../../../errors/index.js';
import ConfigLoader from '../../../tools/config/index.js';
import type { IUserRepository } from './types.js';
import type { IUserEntity } from '../entity.js';
import type { IAddUserDto } from '../subModules/add/types.js';

class UserRepository implements IUserRepository {
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  private accessor repository: IUserRepository;

  async getByLogin(login: string): Promise<IUserEntity | null> {
    return this.repository.getByLogin(login);
  }

  async get(id: string): Promise<IUserEntity | null> {
    return this.repository.get(id);
  }

  async update(id: string, data: Partial<IUserEntity>): Promise<void> {
    return this.repository.update(id, data);
  }

  async add(data: IAddUserDto): Promise<string> {
    return this.repository.add(data);
  }
}

export default class UserFacade {
  private constructor() {
    // empty
  }

  static createInstance(): IUserRepository {
    const repositoryTarget = ConfigLoader.getConfig().repository;

    switch (repositoryTarget) {
      case 'memory':
        UserFacade.instance = new UserRepository(new MemoryUserRepository());
        return UserFacade.instance;
      default:
        Log.error('No repository controller specified. Please specify type of controller in config files');
        throw new NoRepositoryControllerSpecified();
    }
  }

  private static accessor instance: IUserRepository | undefined = undefined;
}
