export interface UnderlyingResourceStateReporter {
  emitResourceIsReady(): void;
  emitResourceIsRecovering(): void;
}
