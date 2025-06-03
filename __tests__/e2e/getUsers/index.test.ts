import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { FourOhFour } from '../../../src/errors/index.js';
import { IFullError } from '../../../src/types/errors.js';
import { IGetUserDto } from '../../../src/modules/users/subModules/get/types.js';
import { IUserEntity } from '../../../src/modules/users/entity.js';
import { Express } from 'express'

describe('Generic tests', () => {
  const getUserReq: IGetUserDto= {
    id: '2'
  }
  let app: Express | null = null

  beforeAll(() => {
    app = State.router.app
  })

  describe('Should throw', () => {
    describe('No data', () => {
      it(`No route`, async () => {
        const target = new FourOhFour()

        const res = await supertest(app!)
          .post('/users')
          .send(getUserReq);

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    });

    describe('Incorrect data', () => {
      it(`Id is not string`, async () => {
        const target = new FourOhFour()

        const res = await supertest(app!)
          .post('/test')
          .send({ ...getUserReq, id: 2 });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    })
  });

  describe('Should pass', () => {
    it(`Get data`, async () => {
      const res = await supertest(app!)
        .post('/test')
        .send(getUserReq);

      const reqBody = res.body as { data: IUserEntity | null };

      // There is no user in database
      expect(reqBody.data).toBe(undefined);
    });
  })
});
