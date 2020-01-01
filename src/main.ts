import 'reflect-metadata';

import { Application } from './infrastructure/core/Application';

const app = new Application();
app.init().then(() => app.start());
