import rateLimit from 'express-rate-limit';
import RateLimitStore from './stores/rateLimiter.js';
import { ETTL } from '../../../enums/index.js';
import * as errors from '../../../errors/index.js';
import ConfigLoader from '../../../tools/config/index.js';
import State from '../../../tools/state.js';
import type * as enums from '../../../enums/index.js';
import type * as types from '../../../types/index.js';
import type express from 'express';

/**
 * Rate limiter for routes access.
 * This limiter is disabled in tests.
 * @param _req Express.Request.
 * @param _res Express.Response.
 * @param next Express.Next.
 */
export const limitRate =
  process.env.NODE_ENV === 'test'
    ? (_req: express.Request, _res: express.Response, next: express.NextFunction): void => {
        next();
      }
    : rateLimit({
        store: RateLimitStore.create(),
        windowMs: ETTL.ExpressRateLimiter * 1000,
        limit: 50,
        message: { data: 'Too many requests from this IP, please try again in an 1 min' },
        validate: { trustProxy: ConfigLoader.getConfig().trustProxy },
      });

export const getController = <T extends enums.EControllers, N extends types.IControllerActions>(
  target: T,
  subTarget: N,
): types.IInnerController[T][N] => {
  const controller = State.controllers.resolve(target);
  if (!controller) throw new errors.UnregisteredControllerError(target);

  const subController = controller.resolve(subTarget) as types.IAbstractSubController<T>;
  if (!subController) throw new errors.UnregisteredControllerError(subTarget);

  return subController;
};
