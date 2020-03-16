import { AppType } from 'src/app/AppType';
import { SecurityContext } from 'src/app/use-case/context';
import { UseCaseContext } from 'src/app/use-case/context/UseCaseContext';
import {
  ApplicationGateway,
  ApplicationInterface,
  AsyncInitializable,
  ApplicationUnderlyingResource,
  ApplicationEventEmitter,
} from 'src/app/core/interfaces';
import {
  ConfigurationProvider,
  UseCaseDispatcherService,
} from 'src/app/services';
import { UseCaseResult } from 'src/app/use-case/results/UseCaseResult';
import 'src/app/use-case/vendors';
import { AppConfiguration } from 'src/domain/value-objects/configuration';
import { ApplicationContainer } from './ApplicationDiContainer';
import express = require('express');
import { UseCaseInput } from 'src/app/use-case/input';
import { UseCase, UseCaseResultPresenter } from 'src/app/use-case/definitions';
import { ApplicationEventEmitterImpl } from './ApplicationEventEmitterImpl';
import { UnderlyingResourceManager } from './underlying-resource-manager';

const NOT_INITIALIZED_ERROR_MESSAGE = 'Application did not initialized yet';
const ALREADY_INITIALIZED_ERROR_MESSAGE = 'Application did not initialized yet';
const NOT_STARTED_ERROR_MESSAGE = 'Application did not STARTED yet';
const ALREADY_STARTED_ERROR_MESSAGE = 'Application did not STARTED yet';

export class Application implements ApplicationInterface, AsyncInitializable {
  private appInitialized: boolean;
  private appStarted: boolean;
  private applicationDiContainer: ApplicationContainer;
  private useCaseDispatcher: UseCaseDispatcherService;
  private applicationEventListener: ApplicationEventEmitter;
  private underlyingResourceManager: UnderlyingResourceManager;
  private applicationGateways: ApplicationGateway[];

  constructor() {
    this.appInitialized = false;
    this.appStarted = false;

    this.useCaseDispatcher = new UseCaseDispatcherService();
    this.applicationEventListener = new ApplicationEventEmitterImpl();
    this.underlyingResourceManager = new UnderlyingResourceManager(
      this.applicationEventListener,
    );
    this.applicationDiContainer = new ApplicationContainer(
      this.underlyingResourceManager,
    );

    this.applicationGateways = [];
  }

  public isInitialized() {
    return this.appInitialized;
  }

  public isStarted() {
    return this.appStarted;
  }
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
    if (!this.appInitialized) {
      throw Error(NOT_INITIALIZED_ERROR_MESSAGE);
    }

    return this.applicationDiContainer.get<UseCase>(useCaseId) as UseCase;
  }

  public injectMock<T>(injectionId, value: any) {
    this.applicationDiContainer.injectMock<T>(injectionId, value);
  }

  public loadGateway(gateway: ApplicationGateway) {
    if (this.appInitialized) {
      throw Error('Application already initialized');
    }
    gateway.load(this as Application);
    this.applicationGateways.push(gateway);
  }

  public async dispatchUseCase(
    useCase: UseCase,
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<void> {
    if (!this.appInitialized) {
      throw Error('Application did not initialized yet');
    }

    await this.useCaseDispatcher.dispatch(useCase, context, presenter);
  }

  public async startApp(): Promise<void> {
    if (!this.appInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR_MESSAGE);
    }

    if (this.appStarted) {
      throw new Error(ALREADY_STARTED_ERROR_MESSAGE);
    }

    await Promise.all(
      this.applicationGateways.map(gateway => {
        gateway.start();
      }),
    );
    this.appStarted = true;
  }

  private async doAsyncInit(): Promise<void> {
    if (this.appInitialized) {
      throw Error(ALREADY_INITIALIZED_ERROR_MESSAGE);
    }

    this.applicationDiContainer.bindApplicationContainer();
    await this.underlyingResourceManager.asyncInit();

    this.appInitialized = true;
  }
  public async asyncInit(): Promise<void> {
    try {
      await this.doAsyncInit();
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(
        'Can not initialize the application due to the following error:',
        error.message,
      );
      // tslint:disable-next-line: no-console
      console.error(error.stack);
      process.exit(-1);
    }
  }
}
