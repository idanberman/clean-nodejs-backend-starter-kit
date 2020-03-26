import express from 'express';
import { ApplicationInterface } from 'src/infrastructure/application-container/interfaces';
import { UseCaseResult } from 'src/domain/kernel/use-case/UseCaseResult';
import { ExpressPresenter } from './ExpressPresenter';
import { UseCaseResultPresenter } from 'src/domain/interfaces';
import {
  UseCaseInput,
  SecurityContext,
  UseCaseContext,
} from 'src/domain/kernel/use-case';
export class ExpressJsAdapter {
  private createUseCaseInputFromRequest(
    request: express.Request,
  ): UseCaseInput {
    return {
      parameters: request.params,
      data: request.body,
    };
  }

  private createSecurityContextFromRequest(
    request: express.Request,
  ): SecurityContext {
    return { userId: 'anything' };
  }

  public createUseCaseContextFromRequest(
    request: express.Request,
    applicationInterface: ApplicationInterface,
  ): UseCaseContext {
    return applicationInterface.createUseCaseContext(
      this.createUseCaseInputFromRequest(request),
      this.createSecurityContextFromRequest(request),
    );
  }
  public getPresenter(response: express.Response): UseCaseResultPresenter {
    return new ExpressPresenter(response);
  }
}
