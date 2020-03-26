import { ApplicationFactory } from './infrastructure/application-container/ApplicationFactory';
ApplicationFactory.productionApp()
  .then(app => app.startApp())
  .catch(error => {
    // tslint:disable-next-line: no-console
    console.error('Can not initialize application.');
    // tslint:disable-next-line: no-console
    console.error(error);
    process.exit(-1);
  });
