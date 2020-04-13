export type RawResourceContext = any;

export interface TransactionContext {
  beginTransaction(): Promise<void>;
  disposeTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getRawResourceContext(): RawResourceContext;
}
