import State from '../../src/tools/state.js';
import Router from '../../src/connections/router/index.js';
import Bootstrap from '../../src/tools/bootstrap.js';

export default class Utils {
  constructor() {
    State.controllers = new Bootstrap()
    State.router = new Router();
  }

  async connect(): Promise<void> {
    State.controllers.init()
    State.router.init()
  }

  async close(): Promise<void> {
    State.router.close();
  }
}
