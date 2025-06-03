import type { IAddUserDto } from '../../../../../modules/users/subModules/add/types.js';
import type express from 'express';
import type { ParsedQs } from 'qs';

export type IUserDetailsReq = express.Request<unknown, unknown, IAddUserDto, ParsedQs>;
