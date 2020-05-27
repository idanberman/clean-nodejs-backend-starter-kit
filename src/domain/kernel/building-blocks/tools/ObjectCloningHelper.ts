import { ValueObject } from '../../ddd';
// tslint:disable-next-line: no-unused-expression
import * as DomainTypeGuard from './DomainTypeGuard';
import {
  ValidValueObjectProperties,
  ValidValueObjectPropertiesValue,
} from '../types/types';

export class ObjectCloningHelper {
  private static MAX_DEPTH: number = 8;
  private static MAX_PROPERTIES: number = 100;
  private static MAX_LIST_LENGTH: number = 4_294_967_295;

  public static clone<T extends ValidValueObjectProperties>(
    propertiesMap: T,
  ): T {
    return ObjectCloningHelper.cloneObjectValue(propertiesMap);
  }

  private static cloneObjectValue<
    T extends ValidValueObjectProperties | ValueObject<any>
  >(originalObject: T, depth: number = 0): T {
    ObjectCloningHelper.testDepth(depth, originalObject);

    if (!originalObject || typeof originalObject !== 'object') {
      return null;
    }

    if (Array.isArray(originalObject)) {
      throw new TypeError(
        `Do not support cloning of array or value of nested arrays (arrays that contain other array like [[]])`,
      );
    }
    if (DomainTypeGuard.isValueObject(originalObject)) {
      return originalObject;
    }

    return ObjectCloningHelper.cloneEachKeyInObject<
      Exclude<T, ValueObject<any>>
    >(originalObject as Exclude<T, ValueObject<any>>, depth);
  }

  private static cloneEachKeyInObject<T extends ValidValueObjectProperties>(
    propertiesMap: T,
    depth: number,
  ): T {
    const keys: (keyof T)[] = Object.keys(propertiesMap);
    const clonedObject: any = {};
    for (const key of keys) {
      if (typeof propertiesMap[key] !== 'object') {
        clonedObject[key] = ObjectCloningHelper.cloneValue(
          propertiesMap[key] as Exclude<
            ValidPropertiesValue,
            ValidValueObjectProperties
          >,
        );
      } else {
        ObjectCloningHelper.copyKeyToClonedObject<T>(
          key,
          propertiesMap,
          clonedObject,
          depth,
        );
      }
    }
    return clonedObject;
  }

  private static copyKeyToClonedObject<T extends ValidValueObjectProperties>(
    key: keyof T,
    propertiesMap: T,
    clonedObject: any,
    depth: number,
  ): void {
    if (Array.isArray(propertiesMap[key])) {
      const array: ValidPropertiesValue[] = propertiesMap[
        key
      ] as ValidPropertiesValue[];
      // tslint:disable-next-line: typedef
      clonedObject[key] = array.map((item) => {
        return typeof item === 'object'
          ? this.cloneObjectValue(item, depth)
          : this.cloneValue(item);
      });
    } else {
      clonedObject[key] = ObjectCloningHelper.cloneObjectValue(
        propertiesMap[key] as ValidValueObjectProperties,
        depth + 1,
      );
    }
  }

  cloneValuesCollection<T>(
    valueCollection: ValidValueObjectPropertiesValue[] | ,
  ): {};

  private static cloneValue<T extends ValidValueObjectPropertiesValue>(
    value: T,
  ): T {
    switch (typeof value) {
      case 'symbol':
      case 'undefined':
      case 'string':
      case 'number':
      case 'boolean':
      case 'bigint':
        return value;
    }

    throw TypeError(`Unsupported type. cannot process value:${value}}`);
  }

  public static testDepth(depth: number, propertiesMap: object): void {
    if (depth > ObjectCloningHelper.MAX_DEPTH) {
      throw Error(
        `Max depth of cloning has been reached. Last keys of the cloned propertiesMap were: ${Object.keys(
          propertiesMap,
        )}`,
      );
    }
  }
}
