import { InterfaceToRepositoryImplementation } from '../consts/InterfaceIdToRepositoryClass';
import { Repository, Connection, ObjectType } from 'typeorm';
import { Provider } from '@nestjs/common';
import { InjectionId } from '../consts/InjectionId';
export class RepositoryProvidersFactory {
  private static createProvider(
    interfaceId: string,
    repositoryClass: ObjectType<Repository<any>>,
  ): Provider {
    return {
      provide: interfaceId,
      useFactory: async (connection: Connection) =>
        connection.getCustomRepository(repositoryClass),
      inject: [InjectionId.DatabaseConnection],
    };
  }
  public static get(): Provider[] {
    return Object.entries(
      InterfaceToRepositoryImplementation,
    ).map(([interfaceId, repositoryClass]) =>
      RepositoryProvidersFactory.createProvider(interfaceId, repositoryClass),
    );
  }
}
