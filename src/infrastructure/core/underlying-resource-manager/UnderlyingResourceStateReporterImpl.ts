import { UnderlyingResourceStateReporter } from '../../../app/core/interfaces/UnderlyingResourceStateReporter';
import { ApplicationEventType } from 'src/app/core/definitions/ApplicationEventType';
import { ResourceId } from 'src/app/core/definitions/types';
import { ResourceStatus } from 'src/app/core/definitions/ResourceStatus';
import { ApplicationEventEmitter } from 'src/app/core/interfaces';

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
