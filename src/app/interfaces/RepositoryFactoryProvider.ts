import { RepositoryFactory } from '.';

export interface RepositoryFactoryProvider {
  provide(): RepositoryFactory;
}
