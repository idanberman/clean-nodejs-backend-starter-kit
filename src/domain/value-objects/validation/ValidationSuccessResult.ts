import { ValidationResult } from './ValidationResult';

export class ValidationSuccessResult implements ValidationResult {
  private constructor() {}

  isSucceed(): boolean {
    return true;
  }

  static create(): ValidationSuccessResult {
    return new ValidationSuccessResult();
  }
}
