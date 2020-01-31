import express from 'express';
import { ApplicationInterface } from 'src/app/interfaces';
import { AppType } from 'src/app/AppType';
import { ExpressJsAdapter } from './adapter/ExpressJsAdapter';

export class RouterConfigure {
  public static config(
    expressApp: express.Application,
    application: ApplicationInterface,
  ): void {
    const expressAdapter: ExpressJsAdapter = new ExpressJsAdapter();
    expressApp
      .route('vendors/')
      .get((request: express.Request, response: express.Response) => {
        const useCase = application.getUseCase(AppType.IndexVendorsUseCase);
        const context = expressAdapter.createUseCaseContextFromRequest(
          request,
          application,
        );
        const presenter = expressAdapter.getPresenter(response);
        application.dispatchUseCase(useCase, context, presenter);
      });
  }
}
