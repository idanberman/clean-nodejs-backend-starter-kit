import { Container, interfaces } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { VendorsRepository, VendorsService } from 'src/domain/vendors';
import { TypeormDatabaseService } from '../database/TypeormDatabaseService';
import { InfrastructureType } from '../InfrastructureType';
import { ConfigurationProvider } from './ConfigurationProvider';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { TypeormVendorsRepository } from '../database/repositories';
import express = require('express');
import * as bodyParser from 'body-parser';
import 'src/app/vendors';

export class Application {
  private ioc: Container;
  private express: express.Application;

  public static async getContainer(): Promise<Container> {
    const container: Container = new Container({ autoBindInjectable: true });

    container
      .bind<ConfigurationProvider>(DomainType.ConfigurationProvider)
      .to(ConfigurationProvider);
    container
      .bind<VendorsService>(DomainType.VendorsService)
      .toService(VendorsService);

    container
      .bind<TypeormDatabaseService>(InfrastructureType.DatabaseService)
      .to(TypeormDatabaseService)
      .inSingletonScope();

    // init external services

    // Db will be abele to be bind as needed after this issue will be resolved
    // https://github.com/inversify/InversifyJS/pull/1132
    const dbService = container.get<TypeormDatabaseService>(
      InfrastructureType.DatabaseService,
    );
    await dbService.init();

    // Bind repositories
    container
      .bind<interfaces.Factory<VendorsRepository>>(DomainType.VendorsRepository)
      .toFactory((ctx: interfaces.Context) => {
        return () =>
          new TypeormVendorsRepository(
            ctx.container
              .get<TypeormDatabaseService>(InfrastructureType.DatabaseService)
              .getManager(),
          );
      });

    return container;
  }

  private static getWebServer(ioc: Container): express.Application {
    const app = express();
    // add body parser
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use(bodyParser.json());

    const server = new InversifyExpressServer(ioc, null, null, app);
    return server.build();
  }

  public async init() {
    this.ioc = await Application.getContainer();

    this.express = Application.getWebServer(this.ioc);
    const routeInfo = getRouteInfo(this.ioc);
    console.log('Routes', JSON.stringify(routeInfo, null, '  '));
    console.log(
      'Routes',
      JSON.stringify(
        this.express._router.stack.filter(r => r.route).map(r => r.route.path),
        null,
        '  ',
      ),
    );
  }

  public async start(): Promise<void> {
    const configuration = this.ioc
      .get<ConfigurationProvider>(DomainType.ConfigurationProvider)
      .provide();
    const { httpPort } = configuration.webServer;
    this.express.listen(httpPort);
  }
}
