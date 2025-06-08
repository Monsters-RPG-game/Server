import State from '../../tools/state.js';
import type { EControllers } from '../../enums/index.js';
import type * as types from '../../types/index.js';
import type { QueryResult } from 'pg';

export abstract class RepositoryPostgresFactory<T extends Exclude<EControllers, EControllers.Health>>
  implements types.IAbstractRepository<T>
{
  protected readonly _target: string;

  constructor(target: string) {
    this._target = target;
  }

  protected get target(): string {
    return this._target;
  }

  async add(data: types.IRepositoryAddData[T]): Promise<types.IRepositoryGetFull[T]> {
    await State.postgres.getClient()(this.target).insert<QueryResult>(data);

    const res = await State.postgres.getClient()<types.IRepositoryGetFull[T]>(this.target).where('login', data.login);

    return res[0] as types.IRepositoryGetFull[T];
  }

  async update(id: string, data: types.IRepositoryUpdateData[T]): Promise<types.IRepositoryGetFull[T]> {
    await State.postgres.getClient()(this.target).update(data).where('id', id);

    const res = await State.postgres
      .getClient()<types.IRepositoryGetFull[T]>(this.target)
      .where<types.IRepositoryGetData[T]>('id', id);

    return res as types.IRepositoryGetFull[T];
  }

  async get(id: string): Promise<types.IRepositoryGetData[T]> {
    const data = await State.postgres.getClient()<types.IRepositoryGetFull[T]>(this.target).where('id', id);

    return data[0] as types.IRepositoryGetData[T];
  }

  async getAll(_page: number): Promise<types.IRepositoryGetAllData[T]> {
    const data = await State.postgres
      .getClient()<types.IRepositoryGetAllData[T]>(this.target)
      .select<types.IRepositoryGetAllData[T]>('*');

    return data;
  }
}

export abstract class RepositoryMemoryFactory<T extends Exclude<EControllers, EControllers.Health>>
  implements types.IAbstractRepository<T>
{
  async add(_data: types.IRepositoryAddData[T]): Promise<types.IRepositoryGetFull[T]> {
    return new Promise((resolve) => {
      resolve({} as unknown as types.IRepositoryGetFull[T]);
    });
  }

  async update(_id: string, _data: types.IRepositoryUpdateData[T]): Promise<types.IRepositoryGetFull[T]> {
    return new Promise((resolve) => {
      resolve({} as types.IRepositoryGetFull[T]);
    });
  }

  async get(_id: unknown): Promise<types.IRepositoryGetData[T]> {
    return new Promise((resolve) => {
      resolve({} as types.IRepositoryGetData[T]);
    });
  }

  async getAll(_page: number): Promise<types.IRepositoryGetAllData[T]> {
    return new Promise((resolve) => {
      resolve([] as types.IRepositoryGetAllData[T]);
    });
  }
}
