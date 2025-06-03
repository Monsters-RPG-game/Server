import Log from 'simpl-loggar';
import type Bootstrap from './bootstrap.js';
import type Router from '../connections/router/index.js';
import type { IState } from '../types/index.js';
import { EventEmitter } from 'events';

class State extends EventEmitter implements IState {
  private _alive: boolean = false;
  private _controllers: Bootstrap | null = null;
  private _router: Router | null = null;

  get controllers(): Bootstrap {
    return this._controllers!;
  }

  set controllers(val: Bootstrap) {
    this._controllers = val;
  }

  get router(): Router {
    return this._router!;
  }

  set router(val: Router) {
    this._router = val;
    if (val) this.emit('initialized');
  }

  get alive(): boolean {
    return this._alive;
  }

  set alive(val: boolean) {
    this._alive = val;
  }

  @Log.decorateLog('State', 'App closed')
  kill(): void {
    this.router.close();

    this.alive = false;
  }
}

export default new State();
