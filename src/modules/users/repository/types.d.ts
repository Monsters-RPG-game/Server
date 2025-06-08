import type { IUserEntity } from '../entity.js';
import type { IAddUserDto } from '../subModules/add/types.js';

export interface IUserRepository {
  add(data: IAddUserDto): Promise<IUserEntity>;
  getAll(page: number): Promise<IUserEntity[]>;
  get(id: string): Promise<IUserEntity | null>;
  update(id: string, data: Partial<IUserEntity>): Promise<IUserEntity>;
  getByLogin(login: string): Promise<IUserEntity | null>;
}
