import { BadInputError, NotFoundError } from 'src/domain/errors';
import { BaseEntity, BaseDto } from 'src/domain/interfaces';
import { BaseEntity as TypeormEntity } from 'typeorm';
import { BasicReadRepository } from 'src/domain/interfaces/BasicReadRepository';
import { BasicWriteRepository } from 'src/domain/interfaces/BasicWriteRepository';
import { EntityManager, ObjectType, Repository, UpdateResult } from 'typeorm';

export class CrudTypeormRepository<T extends BaseEntity>
  implements BasicReadRepository<T>, BasicWriteRepository<T> {
  private readonly typeormRepository: Repository<T>;
  private readonly entityType: string;
  constructor(private target: ObjectType<T>, manager: EntityManager) {
    this.typeormRepository = manager.getRepository(target);
    this.entityType = target.name;
  }
  async findAll(): Promise<T[]> {
    return await this.typeormRepository.find();
  }
  async findById(id: any): Promise<T> {
    return await this.typeormRepository.findOne(id);
  }
  async createEntity(entity: T): Promise<T> {
    const insertResult = await this.typeormRepository.insert(entity.toDto());
    return entity;
  }

  private async findOneOrError(id: any): Promise<T> {
    const dbEntity: T = await this.typeormRepository.findOne(id);

    if (!dbEntity) {
      throw new NotFoundError(this.entityType, id);
    }

    return dbEntity;
  }
  async updateEntity(id: any, entity: Partial<T>): Promise<BaseDto> {
    const dbEntity: T = await this.findOneOrError(id);

    const updateResult: UpdateResult = await this.typeormRepository.update(
      dbEntity.getId(),
      entity.toDto(),
    );

    if (updateResult.affected === 0) {
      throw BadInputError;
    }

    return updateResult.generatedMaps;
  }
  async removeEntity(entity: T): Promise<void> {
    try {
      await this.typeormRepository.remove(entity);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async removeById(id: any): Promise<void> {
    const entityToRemove: T = await this.findOneOrError(id);

    if (!entityToRemove) {
      throw new NotFoundError(this.entityType, id);
    }
    await this.removeEntity(entityToRemove);
  }
}
