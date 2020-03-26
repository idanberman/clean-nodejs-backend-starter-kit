import { ApplicationEventType } from './ApplicationEventType';

export type ResourceId = string;
export interface UnderlyingResourceEventArguments {
  resourceId: ResourceId;
}
export type UnderlyingResourceEventHandler = (
  underlyingResourceEventType: ApplicationEventType,
  eventArguments: UnderlyingResourceEventArguments,
) => void;

// Soft validation for event types (can be mismatch arguments)
export type EventArguments =
  | UnderlyingResourceEventArguments
  | UnderlyingResourceEventArguments;
export type ApplicationEventHandler =
  | UnderlyingResourceEventHandler
  | UnderlyingResourceEventHandler;
