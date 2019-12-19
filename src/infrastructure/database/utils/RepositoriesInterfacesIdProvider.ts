import { InterfaceToRepositoryImplementation } from '../consts/InterfaceToRepositoryImplementation';

export class RepositoriesInterfacesIdProvider {
  static get(): string[] {
    return Object.keys(InterfaceToRepositoryImplementation) as string[];
  }
}
