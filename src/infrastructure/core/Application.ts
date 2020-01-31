import { Container, interfaces } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { VendorsRepository, VendorsService, Vendor } from 'src/domain/vendors';
import { InfrastructureType } from '../InfrastructureType';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { TypeormVendorsReadWriteRepository } from '../repositories/repositories';
import express = require('express');
import * as bodyParser from 'body-parser';
import 'src/app/vendors';
import { AppType } from 'src/app/AppType';
import { ClassValidatorsValidatorService } from '../validators';
import {
  DtoValidatorService,
  UseCaseResultPresenter,
  ConfigurationProvider,
} from 'src/app/interfaces';
import { ApplicationGateway } from 'src/app/interfaces';
import { RepositoryFactoryProvider } from 'src/app/interfaces';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { ApplicationInterface } from 'src/app/interfaces/ApplicationInterface';
import { UseCaseInput, UseCase } from 'src/app/use-case';
import { UseCaseContext } from 'src/app/context/UseCaseContext';
import { SecurityContext } from 'src/app/context';
import { RepositoryId } from 'src/domain/RepositoryId';
import { DomainRepository } from 'src/domain/interfaces';
import { DotenvConfigurationProvider } from '../configuration/DotenvConfigurationProvider';
import { ApplicationDiContainer } from './ApplicationDiContainer';
import { UseCaseDispatcher } from 'src/app/services';
import { Initializable } from 'src/app/interfaces/Initializable';

export class Application implements ApplicationInterface, Initializable {
  private applicationDiContainer: ApplicationDiContainer;
  private useCaseDispatcher: UseCaseDispatcher;
  private applicationGateways: ApplicationGateway[];

  constructor() {
    this.applicationDiContainer = new ApplicationDiContainer();
    this.useCaseDispatcher = new UseCaseDispatcher();
    this.applicationGateways = [];
  }

  // private ioc: Container;
  // private express: express.Application;

  createUseCaseContext(
    input: UseCaseInput,
    securityContext: SecurityContext,
  ): UseCaseContext {
    return new UseCaseContext(input, securityContext);
  }

  getConfiguration(): AppConfiguration {
    return this.applicationDiContainer
      .get<ConfigurationProvider>(AppType.ConfigurationProvider)
      .provide();
  }

  getUseCase(useCaseId): UseCase {
    return this.applicationDiContainer.get<UseCase>(useCaseId) as UseCase;
  }

  injectMock<T>(injectionId, value: new (...args: any[]) => T) {
    this.applicationDiContainer.injectMock<T>(injectionId, value);
  }

  loadGateway(gateway: ApplicationGateway) {
    gateway.load(this as Application);
    this.applicationGateways.push(gateway);
  }

  dispatchUseCase(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ) {
    this.useCaseDispatcher.dispatch(useCase, context, presenter);
  }

  async init(): Promise<void> {
    await this.applicationDiContainer.bindRepositories();
    this.applicationGateways.forEach(gateway => {
      gateway.start();
    });
  }
}
