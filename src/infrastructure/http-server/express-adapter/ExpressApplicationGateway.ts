import { ApplicationGateway, ApplicationInterface } from 'src/app/interfaces';
import express from 'express';
import bodyParser from 'body-parser';
import { RouterConfigure } from './RouterConfigure';

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
    RouterConfigure.config(app, this.applicationInterface);
    this.expressApp = app;
  }

  public start(): void {
    const { httpPort } = this.applicationInterface.getConfiguration().webServer;
    this.expressApp.listen(httpPort);
  }

  public stop(): void {
    throw new Error('Method not implemented.');
  }
}
