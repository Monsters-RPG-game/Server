import { afterEach, beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import knex from 'knex'
import { ETableNames } from '../../../src/enums/db.js';
import Tester from '../../utils/tester/index.js'

interface IGetAllUsersResponse {
  data: {
    users: IUserEntity[]
  }
}

describe('Get all users', () => {
  let app: Express | null = null
  let postgres: knex.Knex.QueryBuilder | null = null
  let tester: Tester | null = null

  beforeAll(() => {
    app = State.router.app
    postgres = State.postgres.getClient()(ETableNames.Users)
    tester = new Tester(postgres)
  })

  afterEach(async () => {
    await tester!.cleanUp()
  })

  beforeEach(async () => {
    await tester!.cleanUp()
  })

  describe('Should pass', () => {
    it(`Get users - no users`, async () => {
      const reqBody = { query: "{ users { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetAllUsersResponse

      expect(body.data.users.length).toEqual(0)
    });

    it(`Get users - 1 user in db`, async () => {
      await tester?.createFakeUser({ login: 'bread', id: 2 })
      const reqBody = { query: "{ users { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetAllUsersResponse

      expect(body.data.users.length).toEqual(1)
    });
  })
});
