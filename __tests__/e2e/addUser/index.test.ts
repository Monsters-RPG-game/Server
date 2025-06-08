import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { generateRandomName } from '../../utils/index.js'
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import type { IFakeKnex } from '../../utils/fakes/postgres.js'
import { ETableNames } from '../../../src/enums/db.js';
import { UserAlreadyRegistered } from '../../../src/errors/index.js';

interface IAddUserResponse {
  data: {
    addUser: IUserEntity | null
  }
}

interface IAddUserError {
  errors: [
    {
      message: string,
      locations: string[],
      path: string[],
      extensions: {code: string, status: number}
    }
  ],
  data: { addUser: null }
}

describe('Add user', () => {
  let app: Express | null = null
  let postgres: IFakeKnex | null = null

  beforeAll(() => {
    app = State.router.app
  })

  beforeEach(() => {
    jest.resetAllMocks()

    State.postgres.init()
    // @ts-expect-error Ignored in tests
    postgres = State.postgres.getClient()(ETableNames.Users) as IFakeKnex
  })

  describe('Should fail', () => {
    it(`Add user - missing login - graph error`, async () => {
      postgres!.where.mockReturnValueOnce([])
      postgres!.where.mockReturnValueOnce([{ login: 'userName', id: 2 }])
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

      const body = res.body as IAddUserError

      expect(body.errors[0].message).toEqual(`Variable "$user" got invalid value null at "user.login"; Expected non-nullable type "String!" not to be null.`)
    });

    it(`Add user - login too short - js error`, async () => {
      postgres!.where.mockReturnValueOnce([])
      postgres!.where.mockReturnValueOnce([{ login: 'userName', id: 2 }])
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

      const body = res.body as IAddUserError

      expect(body.errors[0].message).toEqual(`login should be more than 3 and less than 50 characters`)
    });

    it(`Add user - login too long - js error`, async () => {
      postgres!.where.mockReturnValueOnce([])
      postgres!.where.mockReturnValueOnce([{ login: generateRandomName(55), id: 2 }])
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

      const body = res.body as IAddUserError

      expect(body.errors[0].message).toEqual(`login should be more than 3 and less than 50 characters`)
    });

    it(`Add user - user already exists`, async () => {
      postgres!.where.mockReturnValueOnce([{ login: 'userName', id: 2 }])
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

      const body = res.body as IAddUserError
      const errorTarget = new UserAlreadyRegistered()

      expect(body.errors[0]!.message).toEqual(errorTarget.message)
      expect(body.errors[0]!.extensions.code).toEqual(errorTarget.extensions.code)
      expect(body.errors[0]!.extensions.status).toEqual(errorTarget.extensions.status)
    })
  })

  describe('Should pass', () => {
    it(`Add user`, async () => {
      postgres!.where.mockReturnValueOnce([])
      postgres!.where.mockReturnValueOnce([{ login: 'userName', id: 2 }])
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

      expect(body.data.addUser?.id).toEqual("2")
      expect(body.data.addUser?.login).toEqual("userName")
      expect(postgres!.insert).toHaveBeenCalled()
    });
  })
});
