import express from 'express';
import { ApplicationInterface } from 'src/app/interfaces';
import { AppType } from 'src/app/AppType';
import { ExpressJsAdapter } from './ExpressJsAdapter';
import { ExpressRouteGenerator } from './ExpressRouteGenerator';

export class RouterConfigure {
  public static config(
    expressApp: express.Application,
    application: ApplicationInterface,
  ): void {
    const expressRouteGenerator: ExpressRouteGenerator = new ExpressRouteGenerator(
      application,
    );
    expressApp
      .route('/vendors/')
      .get(expressRouteGenerator.generate(AppType.IndexVendorsUseCase))
      .post(expressRouteGenerator.generate(AppType.CreateVendorUseCase));
  }
}
