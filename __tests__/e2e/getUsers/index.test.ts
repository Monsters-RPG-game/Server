import { beforeEach, jest, beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import type { IFakeKnex } from '../../utils/fakes/postgres.js'
import { ETableNames } from '../../../src/enums/db.js';

interface IGetAllUsersResponse {
  data: {
    users: IUserEntity[]
  }
}

describe('Get all users', () => {
  let app: Express | null = null
  let postgres: IFakeKnex | null = null

  beforeAll(() => {
    app = State.router.app
    // @ts-expect-error Ignored in tests
    postgres = State.postgres.getClient()(ETableNames.Users) as IFakeKnex
  })

  beforeEach(() => {
    jest.resetAllMocks()

    State.postgres.init()
    // @ts-expect-error Ignored in tests
    postgres = State.postgres.getClient()(ETableNames.Users) as IFakeKnex
  })

  describe('Should pass', () => {
    it(`Get users - no users`, async () => {
      postgres!.select.mockReturnValueOnce([])
      const reqBody = { query: "{ users { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetAllUsersResponse

      expect(body.data.users.length).toEqual(0)
    });

    it(`Get users - 1 user in db`, async () => {
      postgres!.select.mockReturnValueOnce([{ id: 2, login: 'bread'}])
      const reqBody = { query: "{ users { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetAllUsersResponse

      expect(body.data.users.length).toEqual(1)
    });
  })
});
