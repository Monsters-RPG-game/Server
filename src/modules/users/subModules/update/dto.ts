import Validation from '@monsters/validator';
import type { IUpdateUserDto } from './types.js';

export default class UpdateUserDto implements IUpdateUserDto {
  login?: string;

  constructor(data: IUpdateUserDto) {
    this.login = data.login;

    this.validate();
  }

  private validate(): void {
    if (this.login) new Validation(this.login, 'login').isDefined().isString().hasLength(50, 3);
  }
}
