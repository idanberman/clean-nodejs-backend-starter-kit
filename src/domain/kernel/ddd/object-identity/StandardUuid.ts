import { DomainObjectIdentity } from './DomainObjectIdentity';
import { Entity } from 'typeorm';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import crypto from 'crypto';
import { ValueObject } from '../ValueObject';

const UUID_REGEXP: RegExp = RegExp(
  '/^([0-9a-f]{8}[0-9a-f]{8}|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})$/',
  'i',
);

const UUID_REGEXP_NO_DASHES: RegExp = RegExp(
  '/^([0-9a-f]{8}[0-9a-f]{31}[089ab][0-9a-f]{15})$/',
  'i',
);

const UUID_DASHED_LENGTH: number = 36;
const UUID_NORMALIZED_LENGTH: number = 32;
const DASH_INDEXES: Set<number> = new Set([8, 13, 18, 23]);
type StandardUuidProperties = {
  value: string;
};
export class StandardUuid extends ValueObject<StandardUuidProperties> {
  private constructor(uuid: string) {
    super({ value: StandardUuid.formatUuid(uuid) });
  }

  get value(): string {
    return this.properties.value;
  }

  get dashedUuid(): string {
    return this.getDashedFormatted();
  }

  private getDashedFormatted(): string {
    const dashedFormatCharacters: string[] = new String[UUID_DASHED_LENGTH]();
    let normalizedScannerIndex: number = 0;
    for (
      let dashedIndex: number = 0;
      dashedIndex < UUID_DASHED_LENGTH;
      dashedIndex++
    ) {
      dashedFormatCharacters[dashedIndex] = DASH_INDEXES.has(dashedIndex)
        ? '-'
        : this.properties.value[normalizedScannerIndex++];
    }

    return dashedFormatCharacters.join('');
  }

  private static formatUuid(uuid: string): string {
    if (!uuid === null) {
      return StandardUuid.getNullUuid();
    }

    if (!uuid || !UUID_REGEXP.test(uuid) || !UUID_REGEXP_NO_DASHES.test(uuid)) {
      throw new TypeError(
        `Uuid is invalid. Got Value:'${uuid}' from type ${typeof uuid}`,
      );
    }
    return StandardUuid.normalizeUuid(uuid);
  }

  private static normalizeUuid(uuid: string): string {
    return uuid.toLowerCase().split('-').join('');
  }

  private static getNullUuid(): string {
    return '0'.repeat(16);
  }

  private static generateNewUuid(): string {
    return StandardUuid.normalizeUuid(uuidv1());
  }

  public static create() {
    return new StandardUuid(StandardUuid.generateNewUuid());
  }

  public static createFrom(uuidString: string): StandardUuid {
    return new StandardUuid(uuidString);
  }
}
