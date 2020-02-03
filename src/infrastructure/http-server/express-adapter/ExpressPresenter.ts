import { UseCaseResultPresenter } from 'src/app/interfaces';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import express from 'express';
import { UseCaseTerminationStatus } from 'src/app/use-case';
export class ExpressPresenter implements UseCaseResultPresenter {
  constructor(private readonly response: express.Response) {}
  private getHttpCodeForResult(result: UseCaseResult): number {
    switch (result.terminationStatus as UseCaseTerminationStatus) {
      case UseCaseTerminationStatus.Succeed:
        if (this.isEmpty(result.data)) {
          return 204;
        }
        return 200;

      case UseCaseTerminationStatus.Unauthorized:
        return 401;

      case UseCaseTerminationStatus.InsufficientPermissions:
        return 403;
      case UseCaseTerminationStatus.InputSyntaxError:
        return 400;
      case UseCaseTerminationStatus.UnableProcessInput:
        return 422;

      case UseCaseTerminationStatus.NotFound:
        return 404;

      case UseCaseTerminationStatus.InternalError:
      default:
        return 500;
    }
  }

  private isEmpty(value): boolean {
    return value === null || value === undefined;
  }

  getHttpResponseContentFromResult({ data, metaData }: UseCaseResult) {
    return {
      data: this.isEmpty(data) ? undefined : data,
      metaData: this.isEmpty(metaData) ? undefined : metaData,
    };
  }
  public present(result: UseCaseResult): UseCaseResult {
    this.response
      .status(this.getHttpCodeForResult(result))
      .send(this.getHttpResponseContentFromResult(result));
    return result;
  }
}
