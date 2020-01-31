import { BaseEntity } from 'src/domain/interfaces/BaseEntity';
import { DomainRepository } from './DomainRepository';

export interface BasicReadRepository<T extends BaseEntity>
  extends DomainRepository {
  findAll(): Promise<T[]>;
  findById(id: any): Promise<T>;
}
