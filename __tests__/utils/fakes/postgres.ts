import Postgres from '../../../src/connections/postgres/index.js'
import { jest } from '@jest/globals'
import knex from 'knex'

export interface IFakeKnex {
  where: jest.Mock<(...params: unknown[]) => unknown>;
  select: jest.Mock<(...params: unknown[]) => unknown>;
  insert: jest.Mock<(...params: unknown[]) => unknown>;
  update: jest.Mock<(...params: unknown[]) => unknown>;
}

export default class FakePostgres extends Postgres {
  public mockTable: IFakeKnex = {
    where: jest.fn(),
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
  };

  override init(): void {
    const fakeClient = ((_tableName?: string) => {
      return this.mockTable;
    }) as unknown as knex.Knex;

    // @ts-expect-error Ignored in tests
    fakeClient.raw = jest.fn<unknown>();
    fakeClient.destroy = jest.fn<() => Promise<void>>().mockRejectedValue(new Error('Connection faked'));

    this.knex = fakeClient;
  }
}
