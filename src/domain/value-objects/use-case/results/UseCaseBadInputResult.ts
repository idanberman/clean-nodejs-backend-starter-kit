import { UseCaseResult } from '../UseCaseResult';
import { UseCaseTerminationStatus } from '..';
import { FieldErrorDescription } from '../..';
import { ClassValidatorsValidatorService } from 'src/infrastructure/validators';

export class UseCaseBadInputResult implements UseCaseResult {
  terminationStatus: UseCaseTerminationStatus =
    UseCaseTerminationStatus.BadInput;
  data: FieldErrorDescription[];

  constructor(public readonly fieldErrorsDescription: FieldErrorDescription[]) {
    this.data = fieldErrorsDescription;
  }
}
