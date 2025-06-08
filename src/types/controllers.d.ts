import type * as enums from '../enums/index.js';
import type HealthController from '../modules/health/controller.ts';
import type GetHealthController from '../modules/health/subModules/get/index.ts';
import type UsersController from '../modules/users/controller.js';
import type AddUserSubController from '../modules/users/subModules/add/index.js';
import type GetUserSubController from '../modules/users/subModules/get/index.js';
import type GetAllUsersSubController from '../modules/users/subModules/getAll/index.js';
import type UpdateUserSubController from '../modules/users/subModules/update/index.js';

export type IControllerActions = enums.EUserActions | enums.EHealthActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IUserControllers extends IControllerActionsMap {
  [enums.EUserActions.GetAll]: GetAllUsersSubController;
  [enums.EUserActions.Get]: GetUserSubController;
  [enums.EUserActions.Add]: AddUserSubController;
  [enums.EUserActions.Update]: UpdateUserSubController;
}

export interface IHealthControllers extends IControllerActionsMap {
  [enums.EHealthActions.Get]: GetHealthController;
}

export interface IController {
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.Health]: HealthController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Health]: IHealthControllers;
}
