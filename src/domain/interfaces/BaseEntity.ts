import { BaseEntityDto } from './BaseEntityDto';

export interface BaseEntity {
  toDto(): BaseEntityDto;
  getId(): any;
}
