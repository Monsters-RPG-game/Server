import AddUserRouter from './add/index.js';
import GetUserRouter from './get/index.js';

/**
 * Initialize routes for user router.
 */
const initUserRoutes = (): void => {
  new AddUserRouter();
  new GetUserRouter();
};

export default initUserRoutes;
