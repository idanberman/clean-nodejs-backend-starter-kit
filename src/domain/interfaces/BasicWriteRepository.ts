import { BaseEntity, DomainRepository } from '../kernel/ddd';

export interface BasicWriteRepository<T extends BaseEntity>
  extends DomainRepository {
  createEntity(entity: T): Promise<T>;
  updateEntity(id: any, entity: Partial<T>): Promise<Partial<T>>;
  removeEntity(entity: T): Promise<void>;
  removeById(id: any): Promise<void>;
}
