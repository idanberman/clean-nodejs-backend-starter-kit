import 'reflect-metadata';
import { Application } from './Application';
import { ExpressApplicationGateway } from '../http-server/express-adapter';

export class ApplicationFactory {
  public static uninitializedApp(): Readonly<Application> {
    // const app = await this.withPersistenceLayerAndConfigured();
    const app = new Application();
    app.loadGateway(new ExpressApplicationGateway());
    return app;
  }
  public static async productionApp(): Promise<Readonly<Application>> {
    const app = ApplicationFactory.uninitializedApp();
    await app.asyncInit();
    await app.startApp();
    return app;
  }
}
