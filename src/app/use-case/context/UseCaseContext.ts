import { SecurityContext } from './SecurityContext';
import { UseCaseInput } from '../input/UseCaseInput';

export class UseCaseContext {
  constructor(
    public readonly input: UseCaseInput,
    public readonly securityContext: SecurityContext,
  ) {}
}
