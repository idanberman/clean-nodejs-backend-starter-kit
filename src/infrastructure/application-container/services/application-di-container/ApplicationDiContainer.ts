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
import { TypeormVendorsRepository } from 'src/infrastructure/persistence/typeorm-adapter/repositories';
import { ClassTransformerValidatorsIoFormattingService } from 'src/infrastructure/io-formatting';
import {
  MultiInputReader,
  MultiInputReaderImpl,
} from 'src/app/services/multi-input-reader';

export interface ApplicationDiContainer {
  bindApplicationContainer(): void;
  get<T>(constructorFunction: string | symbol): T;
  injectMock<T>(injectionId, value: any): void;
}
