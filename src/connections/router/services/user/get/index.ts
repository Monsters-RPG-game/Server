import Log from 'simpl-loggar';
import { EControllers, EUserActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import UserDetailsDto from '../../../../../modules/users/subModules/get/dto.js';
import Routes from '../../../builder/router.js';
import getController from '../../../utils/controllers.js';
import type { IUserDetailsReq } from './types.js';
import type * as types from '../../../../../types/index.js';
import type express from 'express';

export default class UserRouter {
  /**
   * @param req
   * @param res
   * @openapi
   * /user:
   *   get:
   *     tags:
   *       - user
   *     description: Get user's details
   *     parameters:
   *       - in: query
   *         name: name
   *         required: false
   *         schema:
   *           type: string
   *       - in: query
   *         name: id
   *         required: false
   *         schema:
   *           type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Success. Get user's details back in request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/IUserEntity'
   *       400:
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               oneOf:
   *                 - $ref: '#/components/schemas/MissingArgError'
   *                 - $ref: '#/components/schemas/IncorrectArgError'
   */
  @Routes.Get('/user')
  async execute(req: IUserDetailsReq, res: express.Response): Promise<void> {
    try {
      Log.debug('User - get', req.query);

      const controller = getController(EControllers.Users, EUserActions.Get);

      const dto = new UserDetailsDto(req.query);
      const data = await controller.execute(dto);

      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  }
}
