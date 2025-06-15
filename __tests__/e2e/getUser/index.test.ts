import { afterEach, beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import knex from 'knex'
import Tester from '../../utils/index.js'
import { ETableNames } from '../../../src/enums/db.js';

interface IGetUsersResponse {
  data: {
    user: IUserEntity | null
  }
}

describe('Get user', () => {
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
    it(`Get user by login - no users`, async () => {
      const reqBody = { query: "{ user ( login: \"userName\" ) { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user).toBeNull()
    });

    it(`Get full user by login`, async () => {
      await tester!.createFakeUser({ login: 'userName', id: 2 })
      const reqBody = { query: "{ user ( login: \"userName\" ) { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.login).toEqual('userName')
      expect(body.data.user!.id).toEqual("2")
    });

    it(`Get user's id by login`, async () => {
      await tester!.createFakeUser({ login: 'userName', id: 2 })
      const reqBody = { query: "{ user ( login: \"userName\" ) { id } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.login).toBeUndefined()
      expect(body.data.user!.id).toEqual("2")
    });

    it(`Get user's login by login`, async () => {
      await tester!.createFakeUser({ login: 'userName', id: 2 })
      const reqBody = { query: "{ user ( login: \"userName\" ) { login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.id).toBeUndefined()
      expect(body.data.user!.login).toEqual("userName")
    });

    it(`Get user's id by id`, async () => {
      await tester!.createFakeUser({ login: 'userName', id: 2 })
      const reqBody = { query: "{ user ( id: \"2\" ) { id } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.login).toBeUndefined()
      expect(body.data.user!.id).toEqual("2")
    });

    it(`Get user's login by id`, async () => {
      await tester!.createFakeUser({ login: 'userName', id: 2 })
      const reqBody = { query: "{ user ( id: \"2\" ) { login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.id).toBeUndefined()
      expect(body.data.user!.login).toEqual("userName")
    });
  })
});
