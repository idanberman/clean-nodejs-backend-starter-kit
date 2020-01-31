import express from 'express';
import { UseCaseInput } from 'src/app/use-case';
import { SecurityContext } from 'src/app/context/SecurityContext';
import {
  UseCaseResultPresenter,
  ApplicationInterface,
} from 'src/app/interfaces';
import { UseCaseContext } from 'src/app/context';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
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
    return {
      present(result): UseCaseResult {
        response.json(result);
        return result;
      },
    };
  }
}
