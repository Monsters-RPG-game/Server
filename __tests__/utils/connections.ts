import State from '../../src/tools/state.js';
import Router from '../../src/connections/router/index.js';
import FakePostgres from './fakes/postgres.js'
import Bootstrap from '../../src/tools/bootstrap.js';

export default class Utils {
  constructor() {
    State.controllers = new Bootstrap()
    State.postgres = new FakePostgres()
    State.router = new Router();
  }

  async connect(): Promise<void> {
    State.controllers.init()
    State.postgres.init()
    State.router.init()
  }

  async close(): Promise<void> {
    State.router.close();
    State.postgres.close()
  }
}
