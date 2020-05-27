import { ObjectCloningHelper } from '../building-blocks/tools';
import { ValidValueObjectProperties } from '../building-blocks/types/types';

// tslint:disable-next-line: no-empty-interface
// export abstract class ValueObject<PropertiesType extends ValidPropertiesMap> {
export abstract class ValueObject<
  PropertiesType extends ValidValueObjectProperties
> {
  protected readonly _properties: PropertiesType;

  constructor(properties: PropertiesType) {
    this._properties = ObjectCloningHelper.clone(properties);
    Object.freeze(this._properties);
    Object.freeze(this);
  }
}
