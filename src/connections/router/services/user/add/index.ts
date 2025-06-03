import { EControllers, EUserActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import UserDetailsDto from '../../../../../modules/users/subModules/add/dto.js';
import Routes from '../../../builder/router.js';
import getController from '../../../utils/controllers.js';
import type { IUserDetailsReq } from './types.js';
import type * as types from '../../../../../types/index.js';
import type express from 'express';

export default class UserRouter {
  @Routes.Post('/user')
  async execute(req: IUserDetailsReq, res: express.Response): Promise<void> {
    try {
      const controller = getController(EControllers.Users, EUserActions.Add);
      const dto = new UserDetailsDto(req.body);
      const data = await controller.execute(dto);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  }
}
