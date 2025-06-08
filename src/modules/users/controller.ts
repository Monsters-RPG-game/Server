import UserRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import AddUserController from './subModules/add/index.js';
import GetController from './subModules/get/index.js';
import GetAllController from './subModules/getAll/index.js';
import UpdateUserController from './subModules/update/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class UserController extends AbstractController<enums.EControllers.Users> {
  /**
   * Register users controllers.
   * @returns Void.
   */
  protected init(): void {
    const userRepo = UserRepository.createInstance();

    this.register(enums.EUserActions.Get, new GetController(userRepo));
    this.register(enums.EUserActions.GetAll, new GetAllController(userRepo));
    this.register(enums.EUserActions.Add, new AddUserController(userRepo));
    this.register(enums.EUserActions.Update, new UpdateUserController(userRepo));
  }
}
