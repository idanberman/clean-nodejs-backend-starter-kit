import { Module, DynamicModule, Inject } from '@nestjs/common';
import { CoreModule } from '../core/CoreModule';
import {
  createConnection,
  Connection,
  ConnectionOptions,
  Repository,
  ObjectLiteral,
} from 'typeorm';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { CoreService } from 'src/domain/core/services/CoreService';
import { InjectionId } from './consts/InjectionId';
import { InterfaceToRepositoryImplementation } from './consts/InterfaceIdToRepositoryClass';
import { RepositoryProvidersFactory } from './utils/RepositoryProvidersFactory';
import { TypeormConnectionModule } from './TypeormConnectionModule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],

      useFactory: async (coreService: CoreService) =>
        coreService.getConfiguration().database,
      inject: [InterfaceId.CoreService],
    }),
  ],
  providers: [
    // {
    //   provide: InjectionId.DatabaseConnection,
    //   useFactory: async (coreService: CoreService) => {
    //     return await createConnection(coreService.getConfiguration().database);
    //   },
    //   inject: [InterfaceId.CoreService],
    // },
    // ...RepositoryProvidersFactory.get(),
  ],
  exports: [],
  // exports: [...Object.keys(InterfaceToRepositoryImplementation)],
})
export class TypeormDatabaseModule {}
