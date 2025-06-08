import { GraphQLID, GraphQLNonNull } from 'graphql';
import { EControllers, EUserActions } from '../../../enums/controllers.js';
import AddUserDto from '../../../modules/users/subModules/add/dto.js';
import UpdateUserDto from '../../../modules/users/subModules/update/dto.js';
import getController from '../../router/utils/controllers.js';
import * as schemas from '../schemas/index.js';
import type { IUserEntity } from '../../../modules/users/entity.js';
import type { IAddUserDto } from '../../../modules/users/subModules/add/types.js';

export const addUser = {
  type: schemas.UserType,
  args: {
    user: { type: schemas.AddUserInput },
  },
  resolve: async (_: unknown, { user }: { user: IAddUserDto }): Promise<IUserEntity | null> => {
    const controller = getController(EControllers.Users, EUserActions.Add);

    return controller.execute(new AddUserDto(user));
  },
};

export const updateUser = {
  type: schemas.UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user: { type: new GraphQLNonNull(schemas.EditUserInput) },
  },
  resolve: async (
    _: unknown,
    { id, user }: { id: string; user: Partial<Omit<IUserEntity, 'id'>> },
  ): Promise<IUserEntity> => {
    const controller = getController(EControllers.Users, EUserActions.Update);

    return controller.execute(id, new UpdateUserDto(user));
  },
};
