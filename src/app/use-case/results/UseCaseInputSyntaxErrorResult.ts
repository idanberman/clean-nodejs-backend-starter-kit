import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';
import { FieldErrorDescription } from '../../../domain/value-objects';
import { ClassValidatorsValidatorService } from 'src/infrastructure/validators';

export class UseCaseInputSyntaxErrorResult implements UseCaseResult {
  terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.InputSyntaxError;
  data: FieldErrorDescription[];

  constructor(public readonly fieldErrorsDescription: FieldErrorDescription[]) {
    this.data = fieldErrorsDescription;
  }
}
