import { ApplicationUnderlyingResource } from 'src/infrastructure/application-container/interfaces';
import { ResourceId } from 'src/infrastructure/application-container/definitions/types';
import { UnderlyingResourcesState } from './UnderlyingResourcesState';
import { UnderlyingResourceStateReporterImpl } from './UnderlyingResourceStateReporterImpl';
import { ApplicationEventEmitter } from '../application-event-emitter';
import { UnderlyingResourceManager } from '.';

export class UnderlyingResourceManagerImpl
  implements UnderlyingResourceManager {
  private readonly resources: Map<ResourceId, ApplicationUnderlyingResource>;
  private readonly resourcesState: UnderlyingResourcesState;

  constructor(
    private readonly applicationEventEmitter: ApplicationEventEmitter,
  ) {
    this.resources = new Map<ResourceId, ApplicationUnderlyingResource>();
    this.resourcesState = new UnderlyingResourcesState();
  }

  public async asyncInit(): Promise<void> {
    await Promise.all(
      Array.from(this.resources.values()).map(eachResource =>
        eachResource.asyncInit(),
      ),
    );
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
