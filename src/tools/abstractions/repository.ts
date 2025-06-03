import type { EControllers } from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class RepositoryFactory<T extends Exclude<EControllers, EControllers.Health>>
  implements types.IAbstractRepository<T>
{
  async add(_data: types.IRepositoryAddData[T]): Promise<string> {
    return new Promise((resolve) => {
      // Adding to database
      resolve('');
    });
  }

  async update(_id: string, _data: types.IRepositoryUpdate[T]): Promise<void> {
    return new Promise((resolve) => {
      // Updating element
      resolve();
    });
  }

  async get(_id: unknown): Promise<types.IRepositoryGetData[T] | null> {
    return new Promise((resolve) => {
      // Getting data
      resolve({} as types.IRepositoryGetData[T]);
    });
  }
}
