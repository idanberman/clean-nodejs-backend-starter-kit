// import { InterfaceToRepositoryImplementation } from '../consts/InterfaceToRepositoryImplementation';
// import {
//   Repository,
//   Connection,
//   ObjectType,
//   ConnectionOptions,
//   createConnection,
//   EntitySchema,
// } from 'typeorm';
// import { CoreService } from 'src/domain/core/services/CoreService';
// import { TypeormVendorsRepository } from 'src/infrastructure/database/repositories';
// import * as entitiesDefinition from 'src/domain/entities';
// import { Vendor } from 'src/domain/entities';
// import { Entities } from '../consts/Entities';

// export class RepositoryProvidersFactory {
//   private static createConnectionConfigurationProvider(): Provider {
//     return {
//       provide: injectionId.ConnectionConfiguration,
//       useFactory: (coreService: CoreService): ConnectionOptions =>
//         coreService.getConfiguration().database,
//       inject: [InterfaceId.CoreService],
//     };
//   }
//   private static createConnectionProvider(): Provider {
//     return {
//       provide: injectionId.DatabaseConnection,
//       useFactory: async (connectionOptions: ConnectionOptions) =>
//         await createConnection({
//           ...connectionOptions,
//           entities: [...Entities],
//           // entities: (entitiesDefinition as unknown) as Array<EntitySchema<any>>,
//         }),
//       inject: [injectionId.ConnectionConfiguration],
//     };
//   }
//   private static createProvider(
//     interfaceId: string,
//     repositoryClass: ObjectType<Repository<any>>,
//   ): Provider {
//     return {
//       provide: interfaceId,
//       useFactory: async (connection: Connection) =>
//         connection.getCustomRepository(repositoryClass),
//       inject: [injectionId.DatabaseConnection],
//     };
//   }

//   private static getRepositoriesProviders() {
//     return Object.entries(
//       InterfaceToRepositoryImplementation,
//     ).map(([interfaceId, repositoryClass]) =>
//       RepositoryProvidersFactory.createProvider(interfaceId, repositoryClass),
//     );
//   }
//   public static get(): Provider[] {
//     return [
//       RepositoryProvidersFactory.createConnectionConfigurationProvider(),
//       RepositoryProvidersFactory.createConnectionProvider(),
//       ...RepositoryProvidersFactory.getRepositoriesProviders(),
//     ];
//   }
// }
