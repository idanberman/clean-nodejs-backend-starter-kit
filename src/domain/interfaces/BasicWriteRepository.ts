import { BaseEntity } from 'src/domain/interfaces/BaseEntity';
import { BaseDto } from './BaseDto';
import { DomainRepository } from './DomainRepository';

export interface BasicWriteRepository<T extends BaseEntity>
  extends DomainRepository {
  createEntity(entity: T): Promise<T>;
  updateEntity(id: any, entity: Partial<T>): Promise<BaseDto>;
  removeEntity(entity: T): Promise<void>;
  removeById(id: any): Promise<void>;
}
