import { BaseEntity } from 'src/domain/interfaces/BaseEntity';

export interface BasicWriteRepository<T extends BaseEntity> {
  createEntity(entity: T): Promise<T>;
  updateEntity(entity: T): Promise<T>;
  removeEntity(entity: T): Promise<void>;
  removeById(id: any): Promise<void>;
}
