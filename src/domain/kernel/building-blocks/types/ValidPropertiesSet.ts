import { ValueObject } from '../../ddd';

export type ValidPropertiesValue =
  | string
  | number
  | boolean
  | ValueObject<any>
  | ValidPropertiesMap;

export type ValidPropertiesMap = {
  [key: string]: ValidPropertiesValue | ValidPropertiesValue[];
};
