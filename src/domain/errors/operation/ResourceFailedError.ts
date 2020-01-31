import { DomainError } from '../DomainError';

export class ResourceFailedError implements DomainError {
  type: string = 'ResourceFailedError';
  constructor(
    public readonly componentId: string,
    public readonly actionId: string = 'unknown',
    public readonly causedBy: Error = null,
    public readonly parameters: object = null,
  ) {}
}
