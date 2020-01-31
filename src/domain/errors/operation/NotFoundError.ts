import { FieldErrorDescription } from '../../value-objects/validation/FieldErrorDescription';
import { DomainError } from '../DomainError';

export class NotFoundError implements DomainError {
  public readonly type = 'NotFoundError';
  constructor(
    public readonly resourceType: string,
    public readonly resourceId: any,
  ) {}
}
