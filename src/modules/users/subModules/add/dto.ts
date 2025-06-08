import Validation from '@monsters/validator';
import type { IAddUserDto } from './types.js';

export default class AddUserDto implements IAddUserDto {
  login: string;

  constructor(data: IAddUserDto) {
    this.login = data.login;

    this.validate();
  }

  private validate(): void {
    new Validation(this.login, 'login').isDefined().isString().hasLength(50, 3);
  }
}
