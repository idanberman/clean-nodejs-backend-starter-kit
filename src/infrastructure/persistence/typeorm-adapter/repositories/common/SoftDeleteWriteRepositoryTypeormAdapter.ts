// import { WriteRepositoryTypeormAdapter } from './WriteRepositoryTypeormAdapter';
// import {
//   SoftDeletedRepository,
//   BasicReadRepository,
//   BasicWriteRepository,
// } from 'src/domain/interfaces';
// import { WriteResourceNotFoundError } from 'src/domain/kernel/errors/operation';
// import { DeepPartial, ObjectType, EntityManager } from 'typeorm';
// import {
//   SoftDeletedDetails,
//   TypeormEntity,
// } from 'src/infrastructure/persistence/typeorm-adapter/definitions';
// import { DomainEntity } from 'src/domain/kernel/ddd';
// import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';
// import { Constructor } from 'src/domain/kernel/building-blocks/types';
// import { TransactionContext } from 'src/domain/interfaces/TransactionContext';

// // tslint:disable-next-line: no-empty-interface

// export class SoftDeleteWriteRepositoryTypeormAdapter<
//   DomainEntityType extends DomainEntity<UuidType, any>,
//   DbEntityType extends TypeormEntity<UuidType>,
//   UuidType extends ValidEntityUid
// > extends WriteRepositoryTypeormAdapter<
//   DomainEntityType,
//   DbEntityType,
//   UuidType
// > {
//   constructor(
//     domainEntityClass: Constructor<DomainEntityType>,
//     dbEntityClass: Constructor<DbEntityType>,
//     transactionContext: TransactionContext,
//   ) {
//     super(domainEntityClass, dbEntityClass, transactionContext);
//   }

//   public async setSoftDeleted(id: number, deleted: boolean): Promise<void> {
//     let dbEntity: DbEntityType;
//     try {
//       this.dbContext.manager.findOne(DbEntityClass,{})
//       dbEntity = await this.crudRepository.findById(id);
//     } catch (error) {
//       throw new WriteResourceNotFoundError('id', String(id));
//     }

//     await this.crudRepository.updateEntity(id, ({
//       ...dbEntity,
//       deletedAt: new Date(),
//     } as unknown) as DeepPartial<T>);
//   }
// }
