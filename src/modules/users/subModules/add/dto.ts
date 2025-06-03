import Validation from '../../../../tools/validation.js';
import type { IAddUserDto } from './types.js';

export default class AddUserDto implements IAddUserDto {
  name: string;

  constructor(data: IAddUserDto) {
    this.name = data.name;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString().hasLength(50, 3);
  }
}
