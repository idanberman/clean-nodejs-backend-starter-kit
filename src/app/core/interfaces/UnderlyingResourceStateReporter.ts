import { ApplicationEventType } from 'src/app/core/definitions/ApplicationEventType';
import {
  ResourceId,
  UnderlyingResourceEventArguments,
} from 'src/app/core/definitions/types';
export interface UnderlyingResourceStateReporter {
  emitResourceIsReady(): void;
  emitResourceIsRecovering(): void;
}
