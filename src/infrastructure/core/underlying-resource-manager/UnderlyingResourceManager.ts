import {
  ApplicationUnderlyingResource,
  ApplicationEventEmitter,
} from 'src/app/core/interfaces';
import { ResourceId } from 'src/app/core/definitions/types';
import { UnderlyingResourcesState } from './UnderlyingResourcesState';
import { UnderlyingResourceStateReporterImpl } from './UnderlyingResourceStateReporterImpl';

export class UnderlyingResourceManager {
  private readonly resources: Map<ResourceId, ApplicationUnderlyingResource>;
  private readonly resourcesState: UnderlyingResourcesState;

  constructor(
    private readonly applicationEventEmitter: ApplicationEventEmitter,
  ) {
    this.resources = new Map<ResourceId, ApplicationUnderlyingResource>();
    this.resourcesState = new UnderlyingResourcesState();
  }
  public loadUnderlyingResource(resource: ApplicationUnderlyingResource) {
    const { resourceId } = resource;
    this.resources.set(resourceId, resource);
    this.resourcesState.registerResource(resourceId);
    resource.register(
      new UnderlyingResourceStateReporterImpl(
        resourceId,
        this.applicationEventEmitter,
      ),
    );
  }
}
