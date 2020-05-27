import { Stream } from 'stream';
import { ValueObject } from '../../ddd';
import { PlainValueObject } from '../interfaces/PlainValueObject';

type PrimitiveTypes = string | number | boolean;

// export type PlainObject =
//   | PrimitiveTypes
//   | {
//       [key: string]:
//         | PrimitiveTypes
//         | PlainObject
//         | (PrimitiveTypes | PlainObject)[];
//     };

type ValidMap<ValidValues> = {
  [key: string]: ValidValues;
};
type ValidList<ValidValues> = ValidValues[];

type DeepConstraint<Constraint> =
  | Constraint
  | {
      [key: string]:
        | DeepConstraint<Constraint>
        | (Constraint | DeepConstraint<Constraint>)[];
    }
  | Constraint[];

type PrimitiveConstraint = string | boolean | number | undefined;
type CallableConstraint<Constraint = any> = (...args: any) => Constraint;
type ActionableConstraint = CallableConstraint | Stream;
type NativeConstraint = ActionableConstraint | PrimitiveConstraint;
type PlainConstraint = DeepConstraint<
  | PrimitiveConstraint
  | ValidList<PrimitiveConstraint>
  | ValidMap<PrimitiveConstraint>
>;

type ReadonlyConstraint = NativeConstraint | Readonly<PlainConstraint>;

export type PlainObject = ValidMap<PlainConstraint>;
// export type NonInstanceObject = ValidMap<
//   PlainConstraint | NativeConstraint
// >;

export type DeepReadonly = DeepConstraint<ReadonlyConstraint>;

export type ValidValueObjectPropertiesValue =
  | NativeConstraint
  | ValueObject<any>
  | (NativeConstraint | ValueObject<any>)[];

export type ValidValueObjectProperties = ValidMap<
  ValidValueObjectPropertiesValue
>;

export type ValidEntityProperties = ValidMap<
  PlainConstraint | PlainValueObject
>;

export type CopyOptions = {
  strategy: 'Deep' | 'Shallow';
  immutable: boolean;
  convertToPlain: boolean;
};

export interface Serializable {
  serialize(): PlainObject;
  deserialize(plainObject: PlainObject): void;
}
