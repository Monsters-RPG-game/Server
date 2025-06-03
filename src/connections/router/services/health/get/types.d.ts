import type { IQuery } from '../../../../../types/index.js';
import type express from 'express';

export type IGetHealthReq = express.Request<unknown, unknown, undefined, IQuery>;
