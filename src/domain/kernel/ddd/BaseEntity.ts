import { SimplePlainObject } from '../building-blocks/SimplePlainObject';

export interface BaseEntity {
  toDto(): SimplePlainObject;
  getId(): any;
}
