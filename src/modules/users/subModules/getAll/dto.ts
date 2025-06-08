import Validation from '@monsters/validator';
import type { IGetAllUsersDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUserDetailsDto:
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: number
 */
export default class GetAllUsersDto implements IGetAllUsersDto {
  page: number;

  constructor(data: IGetAllUsersDto) {
    this.page = data?.page ?? 1;

    this.validate();
  }

  validate(): void {
    if (!this.page) new Validation(this.page, 'page').isDefined().isNumber().hasBiggerValue(0);
  }
}
