import { BaseEntity } from 'src/domain/interfaces/BaseEntity';

export interface BasicReadRepository<T extends BaseEntity> {
  findAll(): Promise<T[]>;
  findById(id: any): Promise<T>;
}
