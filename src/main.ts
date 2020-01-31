import 'reflect-metadata';

import { Application } from './infrastructure/core/Application';
import { ApplicationFactory } from './infrastructure/core/ApplicationFactory';
const applicationFactory: ApplicationFactory = new ApplicationFactory();
applicationFactory.productionApp();
