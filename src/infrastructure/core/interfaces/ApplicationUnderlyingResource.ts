import { AsyncInitializable } from './AsyncInitializable';
import { ResourceId } from '../definitions/types';
import { UnderlyingResourceStateReporter } from './UnderlyingResourceStateReporter';

export interface ApplicationUnderlyingResource extends AsyncInitializable {
  readonly resourceId: ResourceId;
  register(underlyingResourceStateReporter: UnderlyingResourceStateReporter);
}
