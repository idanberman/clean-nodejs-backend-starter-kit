import {
  ApplicationGateway,
  ApplicationInterface,
} from 'src/app/core/interfaces';
import express from 'express';
import bodyParser from 'body-parser';
import { RouterFactory } from './RouterFactory';

export class ExpressApplicationGateway implements ApplicationGateway {
  private expressApp: express.Application;
  private applicationInterface: ApplicationInterface;

  // public async init() {
  //   this.ioc = await Application.getContainer();
  //   this.express = Application.getWebServer(this.ioc);
  // }

  public load(applicationInterface: ApplicationInterface) {
    this.applicationInterface = applicationInterface;

    const app = express();
    // add body parser
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use(bodyParser.json());
    const router = RouterFactory.create(this.applicationInterface);
    this.expressApp = app.use('/api', router);
  }

  public async start(): Promise<void> {
    const { httpPort } = this.applicationInterface.getConfiguration().webServer;
    this.expressApp.listen(httpPort);
  }

  public stop(): void {
    throw new Error('Method not implemented.');
  }
}
