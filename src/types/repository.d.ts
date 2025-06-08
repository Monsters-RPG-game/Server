import type * as enums from '../enums/index.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { IAddUserDto } from '../modules/users/subModules/add/types.js';

export interface IRepositoryAddData {
  [enums.EControllers.Users]: IAddUserDto;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
}

export interface IRepositoryGetAllData {
  [enums.EControllers.Users]: IUserEntity[];
}

export interface IRepositoryUpdateData {
  [enums.EControllers.Users]: Partial<IUserEntity>;
}

export interface IRepositoryGetFull {
  [enums.EControllers.Users]: IUserEntity;
}

export interface IAbstractRepository<Z extends Exclude<enums.EControllers, enums.EControllers.Health>> {
  add(data: unknown): Promise<IRepositoryGetFull[Z]>;
  get(data: unknown): Promise<IRepositoryGetData[Z]>;
  getAll(page: number): Promise<IRepositoryGetData[Z][]>;
  update(id: string, data: IRepositoryUpdateData[Z]): Promise<IRepositoryGetFull[Z]>;
}
