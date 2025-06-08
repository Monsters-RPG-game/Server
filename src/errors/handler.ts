import Log from 'simpl-loggar';
import { InternalError } from './index.js';
import type { IFullError } from '../types/errors.js';
import type express from 'express';

const handleErr = (err: IFullError | Error, res: express.Response): void => {
  Log.error('Router error handler', err.message, err.stack);

  let error = err as IFullError;

  if (!(err as IFullError)?.extensions?.code) {
    error = new InternalError();
  }

  const { message, name, extensions } = error;
  res.status(!extensions.status ? 500 : extensions.status).send({
    error: {
      message,
      code: extensions.code,
      name,
    },
  });
};

export default handleErr;
