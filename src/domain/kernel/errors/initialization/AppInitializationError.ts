import { DomainError } from '..';
import { OperationFailedCausedBySystem } from '../operation';

export enum InitializationErrorComponent {
  Config,
  Persistence,
}

export class AppInitializationError implements OperationFailedCausedBySystem {
  public readonly domainErrorType: 'OperationFailedCausedBySystem';
  public readonly componentId: string;
  public readonly actionId: string = 'Initialization';
  public readonly causedBy: Error;

  constructor(
    component: InitializationErrorComponent,
    error: Error | string,
    public readonly parameters: object = {},
  ) {
    this.causedBy =
      error && error instanceof Error
        ? error
        : new Error(`Initialize error: '${error}'`);

    this.componentId = component.toString();
  }
}
