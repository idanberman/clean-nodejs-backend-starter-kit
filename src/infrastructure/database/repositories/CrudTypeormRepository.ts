import { BasicReadRepository } from 'src/domain/interfaces/BasicReadRepository';
import { BasicWriteRepository } from 'src/domain/interfaces/BasicWriteRepository';
import { Repository, EntityManager, ObjectType } from 'typeorm';

export class CrudTypeormRepository<T>
  implements BasicReadRepository<T>, BasicWriteRepository<T> {
  private readonly typeormRepository: Repository<T>;
  constructor(private target: ObjectType<T>, manager: EntityManager) {
    this.typeormRepository = manager.getRepository(target);
  }
  async findAll(): Promise<T[]> {
    return await this.typeormRepository.find();
  }
  async findById(id: any): Promise<T> {
    return await this.typeormRepository.findOne(id);
  }
  async createEntity(entity: T): Promise<T> {
    const insertResult = await this.typeormRepository.insert(entity);
    return entity;
  }
  async updateEntity(entity: T): Promise<T> {
    return await this.typeormRepository.save(entity);
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
    const entityToRemove: T = await this.findById(id);

    if (!entityToRemove) {
      return Promise.reject(`Entity with id ${id} is not exist.`);
    }
    await this.removeEntity(entityToRemove);
  }
}
