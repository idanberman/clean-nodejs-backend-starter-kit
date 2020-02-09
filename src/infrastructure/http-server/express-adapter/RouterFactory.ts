import express from 'express';
import { ApplicationInterface } from 'src/app/interfaces';
import { AppType } from 'src/app/AppType';
import { ExpressJsAdapter } from './ExpressJsAdapter';
import { ExpressRouteGenerator } from './ExpressRouteGenerator';

export class RouterFactory {
  public static create(application: ApplicationInterface): express.Router {
    const expressRouteGenerator: ExpressRouteGenerator = new ExpressRouteGenerator(
      application,
    );

    const router = express.Router();
    router
      .route('/vendors/:id/deleted')
      .put(expressRouteGenerator.generate(AppType.ChangeVendorDeletedUseCase));
    router
      .route('/vendors/')
      .get(expressRouteGenerator.generate(AppType.IndexVendorsUseCase))
      .post(expressRouteGenerator.generate(AppType.CreateVendorUseCase));
    router
      .route('/vendors/:id')
      .put(expressRouteGenerator.generate(AppType.UpdateVendorUseCase))
      .get(expressRouteGenerator.generate(AppType.ReadOneVendorUseCase))
      .delete(expressRouteGenerator.generate(AppType.DeleteVendorUseCase));

    return router;
  }
}
