import { Vendor, VendorsRepository, VendorDto } from 'src/domain/vendors';
import { TransactionContext } from 'src/domain/interfaces';
import { VendorPersistentEntity } from 'src/infrastructure/core/persistent-entities';
import { PersistentToDomainEntityMapper } from '../definitions';
import {
  TypeormWriteRepositoryAdapter,
  TypeormReadRepositoryAdapter,
} from './common';
import { VendorUidType } from 'src/domain/vendors';
import { StandardUuid } from 'src/domain/kernel/ddd/object-identity';

export class TypeormVendorsRepositoryAdapter implements VendorsRepository {
  private readRepository: TypeormReadRepositoryAdapter<
    Vendor,
    VendorPersistentEntity,
    VendorUidType
  >;
  private writeRepository: TypeormWriteRepositoryAdapter<
    Vendor,
    VendorPersistentEntity,
    VendorUidType
  >;

  private static readonly PersistentEntityMapper: PersistentToDomainEntityMapper<
    Vendor,
    VendorPersistentEntity
  > = {
    mapFromPersistent: (entity: VendorPersistentEntity) => {
      const vendor: Vendor = Vendor.create(entity.getIdValue(), { ...entity });
      return vendor;
    },
    mapToPersistent: (entity: Vendor) => {
      const dbEntity: VendorPersistentEntity = new VendorPersistentEntity();
      // set properties
      return dbEntity;
    },
  };

  constructor(protected transactionContext: TransactionContext) {
    this.readRepository = new TypeormReadRepositoryAdapter(
      TypeormVendorsRepositoryAdapter.PersistentEntityMapper,
      VendorPersistentEntity,
      transactionContext,
    );

    this.writeRepository = new TypeormWriteRepositoryAdapter(
      TypeormVendorsRepositoryAdapter.PersistentEntityMapper,
      VendorPersistentEntity,
      transactionContext,
    );
  }

  public async createEntity(entity: Vendor): Promise<Vendor> {
    return await this.writeRepository.createEntity(entity);
  }

  public async updateEntity(entity: Vendor): Promise<Vendor> {
    return await this.writeRepository.updateEntity(entity);
  }

  public async removeEntity(entity: Vendor): Promise<void> {
    return await this.writeRepository.removeEntity(entity);
  }

  public async removeById(id: StandardUuid): Promise<void> {
    return await this.writeRepository.removeById(id);
  }

  public async softRemoveById(id: StandardUuid): Promise<void> {
    return await this.writeRepository.softRemoveById(id);
  }

  public async softRemoveByEntity(entity: Vendor): Promise<void> {
    return await this.writeRepository.softRemoveByEntity(entity);
  }

  public async getTrashedById(id: StandardUuid): Promise<Vendor> {
    return await this.writeRepository.getTrashedById(id);
  }

  public async getTrashed(): Promise<Vendor> {
    return await this.writeRepository.getTrashed();
  }

  public async findById(id: StandardUuid): Promise<Vendor> {
    return await this.readRepository.findById(id);
  }

  public async findAll(): Promise<Vendor[]> {
    return await this.readRepository.findAll();
  }

  public async findTrashedById(id: StandardUuid): Promise<Vendor> {
    return await this.readRepository.findById(id);
  }
  public async findTrashed(): Promise<Vendor> {
    return await this.readRepository.findTrashed();
  }
}
