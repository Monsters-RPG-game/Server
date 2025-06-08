import Validation from '@monsters/validator';
import { MissingArgError } from '../../../../errors/index.js';
import type { IGetUserDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUserDetailsDto:
 *     parameters:
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: id
 *        required: false
 *        schema:
 *          type: string
 */
export default class GetUserDto implements IGetUserDto {
  login?: string;
  id?: string;

  constructor(data: IGetUserDto) {
    this.login = data?.login;
    this.id = data?.id;

    this.validate();
  }

  validate(): void {
    if (!this.login && !this.id) throw new MissingArgError('login');

    if (!this.id) new Validation(this.login, 'login').isDefined().isString().hasMinLength(1);
    if (!this.login) new Validation(this.id, 'id').isDefined().isString().hasMinLength(1);
  }
}
