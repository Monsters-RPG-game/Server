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
  name?: string;
  id?: string;

  constructor(data: IGetUserDto) {
    this.name = data?.name;
    this.id = data?.id;

    this.validate();
  }

  validate(): void {
    if (!this.name && !this.id) throw new MissingArgError('name');

    if (!this.id) new Validation(this.name, 'name').isDefined().isString().hasMinLength(1);
    if (!this.name) new Validation(this.id, 'id').isDefined().isString().hasMinLength(1);
  }
}
