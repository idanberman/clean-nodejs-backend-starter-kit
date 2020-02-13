import { Application } from './Application';
import { ExpressApplicationGateway } from '../http-server/express-adapter';

export class ApplicationFactory {
  public async productionApp(): Promise<Readonly<Application>> {
    // const app = await this.withPersistenceLayerAndConfigured();
    const app = new Application();
    app.loadGateway(new ExpressApplicationGateway());
    await app.asyncInit();
    return app;
  }
}
