import { Container, interfaces, injectable, decorate } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/core/interfaces/InstanceFactory';
import { InputService } from 'src/app/services/input';
import {
  CreateVendorUseCase,
  IndexVendorsUseCase,
  UpdateVendorUseCase,
  ReadOneVendorUseCase,
  DeleteVendorUseCase,
  ChangeVendorDeletedStateUseCase,
} from 'src/app/use-case/vendors';
import { VendorsRepository } from 'src/domain/vendors';
import { DotenvConfigurationProvider } from '../configuration/DotenvConfigurationProvider';
import { InfrastructureType } from '../InfrastructureType';
import { ClassTransformerValidatorsInputService } from '../input';
import { TypeormVendorsReadWriteRepository } from '../persistence/typeorm-adapter/repositories';
import { UseCaseInputReader } from 'src/app/use-case/services/UseCaseInputReader';
import { ConfigurationProvider } from 'src/app/services';
import { TypeormRepositoryFactoryService } from '../persistence/typeorm-adapter/TypeormRepositoryFactoryService';
import { UseCaseInputReaderImpl } from 'src/app/use-case/services';
import { ApplicationUnderlyingResource } from 'src/app/core/interfaces';
import { UnderlyingResourceManager } from './underlying-resource-manager';

export class ApplicationContainer {
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
      .bind<InputService>(AppType.InputService)
      .to(ClassTransformerValidatorsInputService);

    this.diContainer
      .bind<UseCaseInputReader>(AppType.UseCaseInputReader)
      .to(UseCaseInputReaderImpl);
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
