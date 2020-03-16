import 'reflect-metadata';
import { Application } from './Application';
import { ExpressApplicationGateway } from '../http-server/express-adapter';
import { InfrastructureType } from '../InfrastructureType';
export class ApplicationFactory {
  constructor(
    private readonly resourceInjections: [[string | symbol, any]?] = [],
  ) {}

  public uninitializedApp(): Readonly<Application> {
    // const app = await this.withPersistenceLayerAndConfigured();
    const app = new Application();
    app.loadGateway(new ExpressApplicationGateway());
    this.resourceInjections.forEach(([injectionId, value]) =>
      app.injectMock(injectionId, value),
    );
    return app;
  }
  public static async productionApp(): Promise<Readonly<Application>> {
    const factory = new ApplicationFactory();
    const app = factory.uninitializedApp();
    await app.asyncInit();
    return app;
  }
}
