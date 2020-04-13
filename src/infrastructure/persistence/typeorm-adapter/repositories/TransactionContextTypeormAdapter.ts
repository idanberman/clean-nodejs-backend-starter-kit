import {
  TransactionContext,
  RawResourceContext,
} from 'src/domain/interfaces/TransactionContext';
import { QueryRunner } from 'typeorm';

export class TransactionContextTypeormAdapter implements TransactionContext {
  constructor(private readonly queryRunner: QueryRunner) {}

  public async beginTransaction(): Promise<void> {
    if (!this.queryRunner.connection.isConnected) {
      await this.queryRunner.connect();
    }

    return this.queryRunner.startTransaction();
  }
  public async disposeTransaction(): Promise<void> {
    return this.queryRunner.release();
  }
  public commit(): Promise<void> {
    return this.queryRunner.commitTransaction();
  }
  public rollback(): Promise<void> {
    return this.queryRunner.rollbackTransaction();
  }
  public getRawResourceContext(): RawResourceContext {
    return this.queryRunner;
  }
}
