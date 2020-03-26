import { ResourceStatus } from 'src/infrastructure/application-container/definitions/ResourceStatus';
import {
  ResourceId,
  UnderlyingResourceEventArguments,
} from 'src/infrastructure/application-container/definitions/types';
import { ApplicationEventType } from 'src/infrastructure/application-container/definitions/ApplicationEventType';

export class UnderlyingResourcesState {
  private underlyingResourcesState: Map<ResourceId, ResourceStatus>;

  constructor() {
    this.underlyingResourcesState = new Map<ResourceId, ResourceStatus>();
  }

  public registerResource(resourceId: ResourceId) {
    this.underlyingResourcesState.set(resourceId, ResourceStatus.Created);
  }
  public handleUnderlyingResourceEvent(
    underlyingResourceEventType: ApplicationEventType,
    eventArguments: UnderlyingResourceEventArguments,
  ) {
    switch (underlyingResourceEventType) {
      case ApplicationEventType.ResourceRecoveringBegan:
        this.underlyingResourcesState.set(
          eventArguments.resourceId,
          ResourceStatus.Recovering,
        );
      case ApplicationEventType.ResourceHasReachedReadyState:
        this.underlyingResourcesState.set(
          eventArguments.resourceId,
          ResourceStatus.Ready,
        );
    }
  }
}
