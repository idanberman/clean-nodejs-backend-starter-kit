import { ValidPropertiesMap, ValidPropertiesValue } from '../types';
import { ValueObject } from '../../ddd';
// tslint:disable-next-line: no-unused-expression
import * as DomainTypeGuard from './DomainTypeGuard';

export class ObjectTools {
  private static MAX_DEPTH: number = 8;
  public static clone<T extends ValidPropertiesMap>(propertiesMap: T): T {
    return ObjectTools.cloneObjectValue(propertiesMap);
  }

  private static cloneObjectValue<
    T extends ValidPropertiesMap | ValueObject<any>
  >(originalObject: T, depth: number = 0): T {
    ObjectTools.testDepth(depth, originalObject);

    if (!originalObject || typeof originalObject !== 'object') {
      return null;
    }

    if (Array.isArray(originalObject)) {
      throw new TypeError(
        `Do not support cloning of array or value of nested arrays (array contain array as property [[]])`,
      );
    }
    if (DomainTypeGuard.isValueObject(originalObject)) {
      return originalObject;
    }

    return ObjectTools.cloneEachKeyInObject<Exclude<T, ValueObject<any>>>(
      originalObject as Exclude<T, ValueObject<any>>,
      depth,
    );
  }

  private static cloneEachKeyInObject<T extends ValidPropertiesMap>(
    propertiesMap: T,
    depth: number,
  ): T {
    const keys: (keyof T)[] = Object.keys(propertiesMap);
    const clonedObject: any = {};
    for (const key of keys) {
      if (typeof propertiesMap[key] !== 'object') {
        clonedObject[key] = ObjectTools.cloneValue(
          propertiesMap[key] as Exclude<
            ValidPropertiesValue,
            ValidPropertiesMap
          >,
        );
      } else {
        ObjectTools.copyKeyToClonedObject<T>(
          key,
          propertiesMap,
          clonedObject,
          depth,
        );
      }
    }
    return clonedObject;
  }

  private static copyKeyToClonedObject<T extends ValidPropertiesMap>(
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
      clonedObject[key] = ObjectTools.cloneObjectValue(
        propertiesMap[key] as ValidPropertiesMap,
        depth + 1,
      );
    }
  }

  private static cloneValue<T extends ValidPropertiesValue>(value: T): T {
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
    if (depth > ObjectTools.MAX_DEPTH) {
      throw Error(
        `Max depth of cloning has been reached. Last keys of the cloned propertiesMap were: ${Object.keys(
          propertiesMap,
        )}`,
      );
    }
  }
}
