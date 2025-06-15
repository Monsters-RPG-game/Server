import { QueryResult } from 'pg';
import Log from 'simpl-loggar';
import { IUserEntity } from '../../../src/modules/users/entity.js';
import knex from 'knex'

export default class Tester {
  private accessor actions: (() => Promise<unknown>)[] = []
  private accessor created: number[] = []
  private readonly _client: knex.Knex.QueryBuilder

  private get client(): knex.Knex.QueryBuilder {
    return this._client
  }

  constructor(client: knex.Knex.QueryBuilder) {
    this._client = client
  }

  /**
   * Queue new fake user for creation
   */
  createFakeUser(data: Partial<IUserEntity>): Tester | Promise<Tester> {
    this.actions.push(async () => {
      const output = await this.client.insert<QueryResult>(data).returning<{id: number}[]>('id')
      this.created.push(output[0]!.id)
    })

    return this
  }

  async cleanUp(): Promise<void> {
    if(this.created.length === 0) return

  Log.debug("Tester - cleanUp", `About to remove elements with ids: ${this.created.join(', ')}`)

    await Promise.all(this.created.map((id) => {
      this.client
        .delete()
        .where({ id })
        .catch((err) => {
          Log.error("Tester - cleanup", "Cannot clean up ", (err as Error).message)
        })
    }))

    this.created = []
  }

  /**
  * Initialize queued transactions
  */
  then<TResult1 = void, TResult2 = never>(
    onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    const promise = Promise.all(this.actions.map(a => a())).then(() => {
      this.actions = []
    })

    return promise.then(onfulfilled, onrejected)
  }
}
