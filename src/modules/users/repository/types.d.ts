import type { IUserEntity } from '../entity.js';
import type { IAddUserDto } from '../subModules/add/types.js';

export interface IUserRepository {
  add(data: IAddUserDto): Promise<string>;
  get(id: string): Promise<IUserEntity | null>;
  update(id: string, data: Partial<IUserEntity>): Promise<void>;
  getByLogin(login: string): Promise<IUserEntity | null>;
}
