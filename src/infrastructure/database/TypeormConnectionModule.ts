import { Module } from '@nestjs/common';
import { CoreModule } from '../core/CoreModule';
import { InjectionId } from './consts';
import { CoreService } from 'src/domain/core/services/CoreService';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { createConnection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  exports: [InjectionId.DatabaseConnection],
})
export class TypeormConnectionModule {}
