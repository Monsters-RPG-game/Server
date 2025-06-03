import type { IGetUserDto } from '../../../../../modules/users/subModules/get/types.d.ts';
import type express from 'express';
import type { ParsedQs } from 'qs';

export type IUserDetailsReq = express.Request<unknown, unknown, unknown, IGetUserDto & ParsedQs>;
