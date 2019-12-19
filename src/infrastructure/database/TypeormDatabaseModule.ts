import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreService } from 'src/domain/core/services/CoreService';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { CoreModule } from '../core/CoreModule';
import { RepositoryProvidersFactory } from './utils/RepositoryProvidersFactory';
import { RepositoriesInterfacesIdProvider } from './utils/RepositoriesInterfacesIdProvider';
import { InjectionId } from './consts';
import { Connection } from 'typeorm';

@Module({
  imports: [CoreModule],

  // imports: [
  //   TypeOrmModule.forRootAsync({
  //     imports: [CoreModule],
  //     useFactory: async (coreService: CoreService) =>
  //       coreService.getConfiguration().database,
  //     inject: [InterfaceId.CoreService],
  //   }),
  // ],
  providers: [...RepositoryProvidersFactory.get()],
  // exports: [],
  exports: [...RepositoriesInterfacesIdProvider.get()],
})
export class TypeormDatabaseModule {}
