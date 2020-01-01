import { BaseEntity } from 'src/domain/interfaces/BaseEntity';

export interface BaseRepository<T extends BaseEntity> {
  findAll(): Promise<T[]>;
  findById(id: any): Promise<T>;
  insertEntity(entity: T): Promise<T>;
  updateEntity(entity: T): Promise<T>;
  removeEntity(entity: T): Promise<void>;
  removeById(id: any): Promise<void>;
}
