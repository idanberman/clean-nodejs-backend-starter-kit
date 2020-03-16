import { UnderlyingResourceStateReporter } from '../interfaces/UnderlyingResourceStateReporter';
import { ApplicationEventType } from 'src/infrastructure/core/definitions/ApplicationEventType';
import { ResourceId } from 'src/infrastructure/core/definitions/types';
import { ResourceStatus } from 'src/infrastructure/core/definitions/ResourceStatus';
import { ApplicationEventEmitter } from 'src/infrastructure/core/interfaces';

export class UnderlyingResourceStateReporterImpl
  implements UnderlyingResourceStateReporter {
  constructor(
    private readonly resourceId: ResourceId,
    private readonly applicationEventEmitter: ApplicationEventEmitter,
  ) {}

  private emit(
    resourceEventType: ApplicationEventType,
    resourceId: ResourceId,
  ) {
    this.applicationEventEmitter.emit(resourceEventType, {
      resourceId,
    });
  }

  public emitResourceIsReady(): void {
    this.emit(
      ApplicationEventType.ResourceHasReachedReadyState,
      this.resourceId,
    );
  }

  public emitResourceIsRecovering(): void {
    this.emit(ApplicationEventType.ResourceRecoveringBegan, this.resourceId);
  }

  public emitResourceIs;
}
