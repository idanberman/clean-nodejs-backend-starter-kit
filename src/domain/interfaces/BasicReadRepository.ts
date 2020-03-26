import { BaseEntity, DomainRepository } from '../kernel/ddd';

export interface BasicReadRepository<T extends BaseEntity>
  extends DomainRepository {
  findAll(): Promise<T[]>;
  findById(id: any): Promise<T>;
}
