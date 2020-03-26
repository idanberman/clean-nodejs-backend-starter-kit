import { ApplicationUnderlyingResource } from 'src/infrastructure/application-container/interfaces';
import { ResourceId } from 'src/infrastructure/application-container/definitions/types';
import { UnderlyingResourcesState } from './UnderlyingResourcesState';
import { UnderlyingResourceStateReporterImpl } from './UnderlyingResourceStateReporterImpl';

export interface UnderlyingResourceManager {
  asyncInit(): Promise<void>;
  loadUnderlyingResource(resource: ApplicationUnderlyingResource);
}
