import { Container, interfaces, injectable, decorate } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces/InstanceFactory';
import { IoFormattingService } from 'src/app/services/io-formatting-service';
import {
  CreateVendorUseCase,
  IndexVendorsUseCase,
  UpdateVendorUseCase,
  ReadOneVendorUseCase,
  DeleteVendorUseCase,
  ChangeVendorDeletedStateUseCase,
} from 'src/app/use-cases/vendors';
import { VendorsRepository } from 'src/domain/vendors';
import { UnderlyingResourceManager } from '../underlying-resource-manager';
import { ConfigurationProvider } from 'src/app/services/chassis';
import { DotenvConfigurationProvider } from 'src/infrastructure/configuration/DotenvConfigurationProvider';
import { ApplicationUnderlyingResource } from '../../interfaces';
import { InfrastructureType } from 'src/infrastructure/InfrastructureType';
import { TypeormRepositoryFactoryService } from 'src/infrastructure/persistence/typeorm-adapter/TypeormRepositoryFactoryService';
import { TypeormVendorsReadWriteRepository } from 'src/infrastructure/persistence/typeorm-adapter/repositories';
import { ClassTransformerValidatorsIoFormattingService } from 'src/infrastructure/io-formatting';
import {
  MultiInputReader,
  MultiInputReaderImpl,
} from 'src/app/services/multi-input-reader';
import { ApplicationDiContainer } from '.';

export class ApplicationDiContainerImpl implements ApplicationDiContainer {
  private readonly diContainer: Container;
  private isBounded: boolean;
  constructor(private underlyingResourceManager: UnderlyingResourceManager) {
    this.diContainer = new Container({ autoBindInjectable: true });
    this.bindConfiguration();
    this.isBounded = false;
  }

  public bindApplicationContainer(): void {
    if (this.isBounded) {
      throw new Error('DI container already Bounded');
    }

    this.bindUnderlyingResources();
    this.bindRepositories();
    this.bindUseCases();
    this.bindServices();

    this.isBounded = true;
  }

  private bindConfiguration() {
    this.diContainer
      .bind<ConfigurationProvider>(AppType.ConfigurationProvider)
      .to(DotenvConfigurationProvider);
  }

  private bindOneUnderlyingResource<T extends ApplicationUnderlyingResource>(
    injectionId: string | symbol,
    resourceClassConstructor: new (...args: any[]) => T,
  ) {
    // If it already bounded, don't change implementation
    // Useful for testing when we want to inject resource before binding

    if (!this.diContainer.isBound(injectionId)) {
      this.diContainer
        .bind(injectionId)
        .to(resourceClassConstructor)
        .inSingletonScope();
    }

    this.underlyingResourceManager.loadUnderlyingResource(
      this.diContainer.get(injectionId),
    );
  }
  private bindUnderlyingResources() {
    this.bindOneUnderlyingResource(
      InfrastructureType.TypeormRepositoryFactoryService,
      TypeormRepositoryFactoryService,
    );

    // ... more resources
  }

  private bindRepositories(): void {
    this.diContainer
      .bind<InstanceFactory<VendorsRepository>>(AppType.VendorsRepository)
      .toFactory((ctx: interfaces.Context) =>
        ctx.container
          .get<TypeormRepositoryFactoryService>(
            InfrastructureType.TypeormRepositoryFactoryService,
          )
          .getRepositoryFactory(TypeormVendorsReadWriteRepository),
      );
  }

  private bindUseCases() {
    // Vendors use cases
    this.diContainer
      .bind<IndexVendorsUseCase>(AppType.IndexVendorsUseCase)
      .to(IndexVendorsUseCase);
    this.diContainer
      .bind<ReadOneVendorUseCase>(AppType.ReadOneVendorUseCase)
      .to(ReadOneVendorUseCase);
    this.diContainer
      .bind<CreateVendorUseCase>(AppType.CreateVendorUseCase)
      .to(CreateVendorUseCase);
    this.diContainer
      .bind<UpdateVendorUseCase>(AppType.UpdateVendorUseCase)
      .to(UpdateVendorUseCase);
    this.diContainer
      .bind<ChangeVendorDeletedStateUseCase>(
        AppType.ChangeVendorDeletedStateUseCase,
      )
      .to(ChangeVendorDeletedStateUseCase);
    this.diContainer
      .bind<DeleteVendorUseCase>(AppType.DeleteVendorUseCase)
      .to(DeleteVendorUseCase);
  }

  private bindServices() {
    // Application Services
    this.diContainer
      .bind<IoFormattingService>(AppType.IoFormattingService)
      .to(ClassTransformerValidatorsIoFormattingService);

    this.diContainer
      .bind<MultiInputReader>(AppType.MultiInputReader)
      .to(MultiInputReaderImpl);
  }

  public get<T>(constructorFunction: string | symbol): T {
    return this.diContainer.get(constructorFunction);
  }

  public injectMock<T>(injectionId, value: any): void {
    // decorate(injectable, value);

    if (this.diContainer.isBound(injectionId)) {
      this.diContainer.rebind<T>(injectionId).toConstantValue(value);
    } else {
      this.diContainer.bind<T>(injectionId).toConstantValue(value);
    }
  }
}
