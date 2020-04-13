import { ValidPropertiesMap } from '../building-blocks/types';
import { ObjectTools } from '../building-blocks/tools/ObjectTools';

// tslint:disable-next-line: no-empty-interface
export abstract class ValueObject<PropertiesType extends ValidPropertiesMap> {
  protected readonly properties: PropertiesType;

  constructor(properties: PropertiesType) {
    this.properties = ObjectTools.clone(properties);
    Object.freeze(this.properties);
    Object.freeze(this);
  }
}
