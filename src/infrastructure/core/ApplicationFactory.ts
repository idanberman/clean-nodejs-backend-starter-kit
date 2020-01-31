import { Application } from './Application';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { RepositoryFactoryProvider } from 'src/app/interfaces';
import { ExpressApplicationGateway } from '../http-server/express/adapter/ExpressApplicationGateway';

export class ApplicationFactory {
  // private getConfigurationProvider(): ConfigurationProvider {
  //   return new ConfigurationProvider();
  // }

  // private async getRepositoryFactoryProvider(
  //   appConfiguration: ConfigurationProvider,
  // ): Promise<RepositoryFactoryProvider> {
  //   const factoryProvider = new TypeormRepositoryFactoryProvider(
  //     appConfiguration,
  //   );
  //   await factoryProvider.init();
  //   return factoryProvider;
  // }

  // private async withPersistenceLayerAndConfigured(): Promise<Application> {
  //   return new Application(
  //     this.getConfigurationProvider().provide(),
  //     await this.getRepositoryFactoryProvider(this.getConfigurationProvider()),
  //   );
  // }

  //   // for quick unit testing
  //   async withMockedPersistenceLayer(app: Application): Promise<Application> {}

  //   injectedPersistenceLayer(app: Application) {}

  public async productionApp(): Promise<Readonly<Application>> {
    // const app = await this.withPersistenceLayerAndConfigured();
    const app = new Application();
    app.loadGateway(new ExpressApplicationGateway());
    await app.init();
    return app;
  }
}
