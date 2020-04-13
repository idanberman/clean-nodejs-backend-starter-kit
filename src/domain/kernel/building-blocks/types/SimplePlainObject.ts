type PrimitiveTypes = string | number | boolean;

export type SimplePlainObject =
  | PrimitiveTypes
  | {
      [key: string]:
        | PrimitiveTypes
        | SimplePlainObject
        | (PrimitiveTypes | SimplePlainObject)[];
    };
