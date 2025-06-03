import Log from 'simpl-loggar';
import type express from 'express';
import { randomUUID } from 'crypto';

export default class Middleware {
  /**
   * Set 'No-Store' for cache control for selected endpoint.
   */
  static DisableCache<This, Return>() {
    return function (
      target: (
        this: This,
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction,
      ) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<
        This,
        (
          this: This,
          req: express.Request,
          res: express.Response,
          next?: express.NextFunction,
        ) => Return | Promise<Return>
      >,
    ): (this: This, req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<Return> {
      return Middleware.createMiddleware(
        target,
        (_req: express.Request, res: express.Response, _next?: express.NextFunction) => {
          res.set('cache-control', 'no-store');
        },
      );
    };
  }

  /**
   * Set 'No-Store' for cache control for selected endpoint.
   */
  static LogRequest<This, Return>() {
    return function (
      target: (
        this: This,
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction,
      ) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<
        This,
        (
          this: This,
          req: express.Request,
          res: express.Response,
          next?: express.NextFunction,
        ) => Return | Promise<Return>
      >,
    ): (this: This, req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<Return> {
      return Middleware.createMiddleware(
        target,
        (req: express.Request, _res: express.Response, _next?: express.NextFunction) => {
          try {
            const logBody: Record<string, string | Record<string, string>> = {
              method: req.method,
              path: req.path,
              ip: req.ip as string,
            };

            if (req.query) logBody.query = JSON.stringify(req.query);
            if (
              req.body !== undefined &&
              typeof req.body === 'object' &&
              Object.keys(req.body as Record<string, string>).length > 0
            ) {
              logBody.body = req.body as Record<string, string>;

              // Hide password in logs
              if (logBody.body.password) {
                logBody.body.password = '***';
              }
            }

            Log.log('New req', logBody);
          } catch (err) {
            Log.error('Middleware validation', err);
          }
        },
      );
    };
  }

  /**
   * Measure time between getting request and responding.
   */
  static MeasureTime<This, Return>() {
    return function (
      target: (
        this: This,
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction,
      ) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<
        This,
        (
          this: This,
          req: express.Request,
          res: express.Response,
          next?: express.NextFunction,
        ) => Return | Promise<Return>
      >,
    ): (this: This, req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<Return> {
      return Middleware.createMiddleware(
        target,
        (req: express.Request, res: express.Response, _next?: express.NextFunction) => {
          const id = randomUUID();
          Log.time(id);

          res.on('finish', () => {
            Log.endTime(id, { path: req.originalUrl, method: req.method });
          });
        },
      );
    };
  }

  /**
   * Create one-time use middleware.
   * @internal
   * @param target Target to call method on.
   * @param logic Logic for middleware.
   */
  private static createMiddleware<This, Return>(
    target: (
      this: This,
      req: express.Request,
      res: express.Response,
      next?: express.NextFunction,
    ) => Return | Promise<Return>,
    logic: (req: express.Request, res: express.Response, next?: express.NextFunction) => void | Promise<void>,
  ): (this: This, req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<Return> {
    return async function (
      this: This,
      req: express.Request,
      res: express.Response,
      next?: express.NextFunction,
    ): Promise<Return> {
      const logicOutput = logic(req, res, next);
      if (logicOutput instanceof Promise) {
        await logicOutput;
      }

      const result = target.apply(this, [req, res, next]);

      if (result instanceof Promise) {
        return result;
      }

      return result;
    };
  }
}
