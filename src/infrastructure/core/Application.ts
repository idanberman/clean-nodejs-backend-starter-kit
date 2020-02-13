import { AppType } from 'src/app/AppType';
import { SecurityContext } from 'src/app/use-case/context';
import { UseCaseContext } from 'src/app/use-case/context/UseCaseContext';
import { ApplicationGateway } from 'src/app/interfaces';
import { ApplicationInterface } from 'src/app/interfaces/ApplicationInterface';
import { AsyncInitializable } from 'src/app/interfaces/AsyncInitializable';
import {
  ConfigurationProvider,
  UseCaseDispatcherService,
} from 'src/app/services';
import { UseCaseResult } from 'src/app/use-case/results/UseCaseResult';
import 'src/app/use-case/vendors';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { ApplicationDiContainer } from './ApplicationDiContainer';
import express = require('express');
import { UseCaseInput } from 'src/app/use-case/input';
import { UseCase, UseCaseResultPresenter } from 'src/app/use-case/definitions';

export class Application implements ApplicationInterface, AsyncInitializable {
  private applicationDiContainer: ApplicationDiContainer;
  private useCaseDispatcher: UseCaseDispatcherService;
  private applicationGateways: ApplicationGateway[];

  constructor() {
    this.applicationDiContainer = new ApplicationDiContainer();
    this.useCaseDispatcher = new UseCaseDispatcherService();
    this.applicationGateways = [];
  }

  // private ioc: Container;
  // private express: express.Application;

  public createUseCaseContext(
    input: UseCaseInput,
    securityContext: SecurityContext,
  ): UseCaseContext {
    return new UseCaseContext(input, securityContext);
  }

  public getConfiguration(): AppConfiguration {
    return this.applicationDiContainer
      .get<ConfigurationProvider>(AppType.ConfigurationProvider)
      .provide();
  }

  public getUseCase(useCaseId): UseCase {
    return this.applicationDiContainer.get<UseCase>(useCaseId) as UseCase;
  }

  public injectMock<T>(injectionId, value: new (...args: any[]) => T) {
    this.applicationDiContainer.injectMock<T>(injectionId, value);
  }

  public loadGateway(gateway: ApplicationGateway) {
    gateway.load(this as Application);
    this.applicationGateways.push(gateway);
  }

  public dispatchUseCase(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    return this.useCaseDispatcher.dispatch(useCase, context, presenter);
  }

  public async asyncInit(): Promise<void> {
    await this.applicationDiContainer.bindRepositories();
    this.applicationGateways.forEach(gateway => {
      gateway.start();
    });
  }
}
