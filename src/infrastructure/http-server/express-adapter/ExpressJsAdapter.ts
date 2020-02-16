import express from 'express';
import { SecurityContext } from 'src/app/use-case/context/SecurityContext';
import { ApplicationInterface } from 'src/app/core/interfaces';
import { UseCaseContext } from 'src/app/use-case/context';
import { UseCaseResult } from 'src/app/use-case/results/UseCaseResult';
import { ExpressPresenter } from './ExpressPresenter';
import { UseCaseInput } from 'src/app/use-case/input';
import { UseCaseResultPresenter } from 'src/app/use-case/definitions';
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
