import { GraphQLList, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { EControllers, EUserActions } from '../../../enums/controllers.js';
import GetUserDto from '../../../modules/users/subModules/get/dto.js';
import GetAllUsersDto from '../../../modules/users/subModules/getAll/dto.js';
import getController from '../../router/utils/controllers.js';
import * as schemas from '../schemas/index.js';
import { filterError } from '../utils/errors.js';
import type { IUserEntity } from '../../../modules/users/entity.js';
import type { IGetUserDto } from '../../../modules/users/subModules/get/types.js';
import type { IGetAllUsersDto } from '../../../modules/users/subModules/getAll/types.js';
import type { IFullError, IFullRawError } from '../../../types/errors.js';

export const users = {
  type: new GraphQLList(schemas.UserType),
  args: {
    page: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args: IGetAllUsersDto): Promise<IUserEntity[]> => {
    try {
      const controller = getController(EControllers.Users, EUserActions.GetAll);

      return controller.execute(new GetAllUsersDto(args));
    } catch (err) {
      filterError(err as IFullError | IFullRawError);

      return [];
    }
  },
};

export const user = {
  type: schemas.UserType,
  args: {
    id: { type: GraphQLID },
    login: { type: GraphQLString },
  },
  resolve: async (_: unknown, args: IGetUserDto): Promise<IUserEntity | null> => {
    try {
      const controller = getController(EControllers.Users, EUserActions.Get);

      return controller.execute(new GetUserDto(args));
    } catch (err) {
      filterError(err as IFullError | IFullRawError);

      return null;
    }
  },
};
