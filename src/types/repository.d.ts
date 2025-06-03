import type * as enums from '../enums/index.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { IAddUserDto } from '../modules/users/subModules/add/types.js';

export interface IRepositoryAddData {
  [enums.EControllers.Users]: IAddUserDto;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
}

export interface IRepositoryUpdate {
  [enums.EControllers.Users]: Partial<IUserEntity>;
}

export interface IAbstractRepository<Z extends Exclude<enums.EControllers, enums.EControllers.Health>> {
  add(data: unknown): Promise<string>;
  get(data: unknown): Promise<IRepositoryGetData[Z]>;
}
