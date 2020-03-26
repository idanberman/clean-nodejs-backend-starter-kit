import { ApplicationInterface } from 'src/infrastructure/application-container/interfaces';
import express from 'express';
import { ExpressJsAdapter } from './ExpressJsAdapter';

export class ExpressRouteGenerator {
  private static ExpressAdapter: ExpressJsAdapter = new ExpressJsAdapter();

  constructor(private readonly application: ApplicationInterface) {}
  public generate(useCaseId) {
    return (request: express.Request, response: express.Response) => {
      const useCase = this.application.getUseCase(useCaseId);
      const context = ExpressRouteGenerator.ExpressAdapter.createUseCaseContextFromRequest(
        request,
        this.application,
      );
      const presenter = ExpressRouteGenerator.ExpressAdapter.getPresenter(
        response,
      );
      this.application.dispatchUseCase(useCase, context, presenter);
    };
  }
}
