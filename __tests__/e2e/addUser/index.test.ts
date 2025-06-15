import { afterEach, beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import type { IGraphError } from '../../types/index.js'
import type { knex } from 'knex'
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import Tester from '../../utils/index.js'
import { UserAlreadyRegistered } from '../../../src/errors/index.js';
import { ETableNames } from '../../../src/enums/db.js';

interface IAddUserResponse {
  data: {
    addUser: IUserEntity | null
  }
}

describe('Add user', () => {
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

  describe('Should fail', () => {
    it(`Add user - missing login - graph error`, async () => {
      const reqBody = {
        "query": "mutation($user: AddUserInput!) { addUser(user: $user) { id login } }",
        "variables": {
          "user": {
            "login": null
          }
        }
      }

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGraphError

      expect(body.errors[0].message).toEqual(`Variable "$user" got invalid value null at "user.login"; Expected non-nullable type "String!" not to be null.`)
    });

    it(`Add user - login too short - js error`, async () => {
      const reqBody = {
        "query": "mutation($user: AddUserInput!) { addUser(user: $user) { id login } }",
        "variables": {
          "user": {
            "login": '1'
          }
        }
      }

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGraphError

      expect(body.errors[0].message).toEqual(`login should be more than 3 and less than 50 characters`)
    });

    it(`Add user - login too long - js error`, async () => {
      const reqBody = {
        "query": "mutation($user: AddUserInput!) { addUser(user: $user) { id login } }",
        "variables": {
          "user": {
            "login": '1'
          }
        }
      }

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGraphError

      expect(body.errors[0].message).toEqual(`login should be more than 3 and less than 50 characters`)
    });

    it(`Add user - user already exists`, async () => {
      await tester!.createFakeUser({ login: 'userName', id: 2 })

      const reqBody = {
        "query": "mutation($user: AddUserInput!) { addUser(user: $user) { id login } }",
        "variables": {
          "user": {
            "login": "userName"
          }
        }
      }

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGraphError
      const errorTarget = new UserAlreadyRegistered()

      expect(body.errors[0]!.message).toEqual(errorTarget.message)
      expect(body.errors[0]!.extensions.code).toEqual(errorTarget.extensions.code)
      expect(body.errors[0]!.extensions.status).toEqual(errorTarget.extensions.status)
    })
  })

  describe('Should pass', () => {
    it(`Add user`, async () => {
      const reqBody = {
        "query": "mutation($user: AddUserInput!) { addUser(user: $user) { id login } }",
        "variables": {
          "user": {
            "login": "userName"
          }
        }
      }

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IAddUserResponse

      expect(body.data.addUser?.id).not.toBeNull()
      expect(body.data.addUser?.login).toEqual("userName")
    });
  })
});
