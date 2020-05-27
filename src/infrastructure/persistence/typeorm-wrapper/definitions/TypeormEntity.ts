import { VersionColumn } from 'typeorm';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';
import { DomainTypeGuard } from 'src/domain/kernel/building-blocks/tools';

type PropertyName = string;
export abstract class TypeormEntity<T extends ValidEntityUid> {
  constructor(private readonly _idColumnNames: PropertyName[]) {}

  @VersionColumn()
  public readonly version: number;

  public getIdValue(): T {
    const [
      firstIdProperty,
      ...restOfIdProperties
    ]: string[] = this._idColumnNames;

    return restOfIdProperties.length === 0
      ? this[firstIdProperty]
      : Object.fromEntries(
          this._idColumnNames.map((property) => [property, this[property]]),
        );
  }

  public setIdValue(id: ValidEntityUid): void {
    const [
      firstIdProperty,
      ...restOfIdProperties
    ]: string[] = this._idColumnNames;

    if (restOfIdProperties.length === 0) {
      this[firstIdProperty] = id;
    } else {
      this._idColumnNames.forEach(
        (idColumnName) => (this[idColumnName] = id[idColumnName]),
      );
    }
  }
}
