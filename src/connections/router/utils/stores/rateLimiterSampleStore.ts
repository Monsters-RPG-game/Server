import Log from 'simpl-loggar';
import { ETTL } from '../../../../enums/ttl.js';
import type { ClientRateLimitInfo, IncrementResponse, Store } from 'express-rate-limit';

/**
 * This is sample store created for rate limiter. This is to be changed in real environment.
 * Most of actions are async, to make them already compatible with real live usage, for example redis.
 */
export default class SampleStore implements Store {
  private accessor store: Map<string, ClientRateLimitInfo> = new Map();

  async increment(target: string): Promise<IncrementResponse> {
    return new Promise((resolve) => {
      let data = this.store.get(target);

      if (!data || Date.now() > data.resetTime!.getTime()) {
        // New window
        data = {
          totalHits: 1,
          resetTime: new Date(Date.now() + ETTL.ExpressRateLimiter * 1000),
        };
      } else {
        data.totalHits += 1;
      }

      this.store.set(target, data);

      Log.debug('Rate limiter sample store', `Incremented rate for target ${target}. New value: ${data.totalHits}`);
      resolve({
        totalHits: data.totalHits,
        resetTime: data.resetTime,
      });
    });
  }

  async resetKey(target: string): Promise<void> {
    return new Promise((resolve) => {
      this.store.delete(target);

      Log.debug('Rate limiter sample store', `Reset hits for target ${target}.`);
      resolve();
    });
  }

  async decrement(target: string): Promise<void> {
    return new Promise((resolve) => {
      let data: ClientRateLimitInfo | undefined = this.store.get(target);
      if (!data) return resolve();

      data = {
        totalHits: data.totalHits > 2 ? (data.totalHits -= 1) : 1,
        resetTime: new Date(Date.now() + 60 * 1000),
      };

      this.store.set(target, data);

      Log.debug('Rate limiter sample store', `Decremented rate for target ${target}. New value: ${data.totalHits}`);
      return resolve();
    });
  }
}
