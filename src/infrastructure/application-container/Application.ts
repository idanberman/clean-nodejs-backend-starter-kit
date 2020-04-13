import { AppType } from 'src/app/AppType';
import {
  ApplicationGateway,
  ApplicationInterface,
  AsyncInitializable,
} from 'src/infrastructure/application-container/interfaces';
import 'src/app/use-cases/vendors';
import { AppConfiguration } from 'src/domain/configuration';
import express = require('express');
import { ApplicationEventEmitterImpl } from './services/application-event-emitter/ApplicationEventEmitterImpl';
import { ConfigurationProvider } from 'src/app/services/chassis';
import {
  UseCaseInput,
  SecurityContext,
  UseCaseContext,
} from 'src/domain/kernel/use-case';
import { UseCase } from 'src/domain/kernel/ddd';
import { UseCaseResultPresenter } from 'src/domain/interfaces';
import {
  UseCaseService,
  UseCaseServiceImpl,
} from './services/use-case-service';
import { ApplicationEventEmitter } from './services/application-event-emitter';
import {
  UnderlyingResourceManager,
  UnderlyingResourceManagerImpl,
} from './services/underlying-resource-manager';
import {
  ApplicationDiContainerImpl,
  ApplicationDiContainer,
} from './services/application-di-container';

const NOT_INITIALIZED_ERROR_MESSAGE = 'Application did not initialized yet';
const ALREADY_INITIALIZED_ERROR_MESSAGE = 'Application did not initialized yet';
const NOT_STARTED_ERROR_MESSAGE = 'Application did not STARTED yet';
const ALREADY_STARTED_ERROR_MESSAGE = 'Application did not STARTED yet';

export class Application implements ApplicationInterface, AsyncInitializable {
  private appInitialized: boolean;
  private appStarted: boolean;
  private applicationDiContainer: ApplicationDiContainer;
  private useCaseService: UseCaseService;
  private applicationEventListener: ApplicationEventEmitter;
  private underlyingResourceManager: UnderlyingResourceManager;
  private applicationGateways: ApplicationGateway[];

  constructor() {
    this.appInitialized = false;
    this.appStarted = false;

    this.useCaseService = new UseCaseServiceImpl();
    this.applicationEventListener = new ApplicationEventEmitterImpl();
    this.underlyingResourceManager = new UnderlyingResourceManagerImpl(
      this.applicationEventListener,
    );
    this.applicationDiContainer = new ApplicationDiContainerImpl(
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

    await this.useCaseService.dispatchUseCase(useCase, context, presenter);
  }

  public async startApp(): Promise<void> {
    if (!this.appInitialized) {
      throw new Error(NOT_INITIALIZED_ERROR_MESSAGE);
    }

    if (this.appStarted) {
      throw new Error(ALREADY_STARTED_ERROR_MESSAGE);
    }

    await Promise.all(
      this.applicationGateways.map((gateway) => {
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
