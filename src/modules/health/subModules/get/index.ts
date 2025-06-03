import State from '../../../../tools/state.js';
import type { IGetHealth } from './types.js';
import type { IAbstractSubController } from '../../../../types/abstractions.js';

export default class GetHealthController implements IAbstractSubController<IGetHealth> {
  async execute(): Promise<IGetHealth> {
    return new Promise((resolve) => {
      resolve({ alive: State.alive });
    });
  }
}
