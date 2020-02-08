import { BaseDto, BaseEntity } from 'src/domain/interfaces';
import { BasicReadRepository } from 'src/domain/interfaces/BasicReadRepository';
import { BasicWriteRepository } from 'src/domain/interfaces/BasicWriteRepository';
import {
  EntityManager,
  ObjectType,
  Repository,
  UpdateResult,
  InsertResult,
  DeepPartial,
} from 'typeorm';
import { ReadResourceNotFoundError } from 'src/domain/errors';
import { WriteResourceNotFoundError } from 'src/domain/errors/operation';
import { VendorDto } from 'src/domain/vendors';

export class CrudTypeormRepository<T extends BaseEntity>
  implements BasicReadRepository<T>, BasicWriteRepository<T> {
  private readonly typeormRepository: Repository<T>;
  private readonly entityType: string;
  constructor(private target: ObjectType<T>, manager: EntityManager) {
    this.typeormRepository = manager.getRepository(target);
    this.entityType = target.name;
  }
  public async findAll(): Promise<T[]> {
    return await this.typeormRepository.find();
  }
  public async findById(id: any): Promise<T> {
    return await this.typeormRepository.findOne(id);
  }
  public async createEntity(entity: T): Promise<T> {
    const insertResult: InsertResult = await this.typeormRepository.insert(
      entity.toDto(),
    );

    return ({ ...entity, ...insertResult.identifiers[0] } as unknown) as T;
  }

  private async findOneOrError(id: any): Promise<T> {
    const dbEntity: T = await this.typeormRepository.findOne(id);

    if (!dbEntity) {
      throw new ReadResourceNotFoundError('id', id);
    }

    return dbEntity;
  }
  public async updateEntity(id: any, entity: Partial<T>): Promise<Partial<T>> {
    let dbEntity: T;
    try {
      dbEntity = await this.findOneOrError(id);
    } catch (error) {
      throw new WriteResourceNotFoundError('id', id);
    }

    const updatedEntity = await this.typeormRepository.save(
      ({
        ...dbEntity,
        ...entity,
      } as unknown) as DeepPartial<T>,
      { reload: true },
    );

    return {
      ...dbEntity,
      ...updatedEntity,
    } as Partial<T>;
  }
  public async removeEntity(entity: T): Promise<void> {
    try {
      await this.typeormRepository.remove(entity);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async removeById(id: any): Promise<void> {
    const entityToRemove: T = await this.findOneOrError(id);

    if (!entityToRemove) {
      throw new WriteResourceNotFoundError('id', id);
    }
    await this.removeEntity(entityToRemove);
  }
}
