import { SecurityContext } from './SecurityContext';
import { UseCaseInput } from '../use-case/input/UseCaseInput';

export class UseCaseContext {
  constructor(
    public readonly input: UseCaseInput,
    public readonly securityContext: SecurityContext,
  ) {}
}
