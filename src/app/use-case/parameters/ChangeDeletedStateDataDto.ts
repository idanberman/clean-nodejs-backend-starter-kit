import { IsInt, Min, IsBoolean, IsDefined } from 'class-validator';
import { BaseDto } from 'src/domain/definitions';
import { Type } from 'class-transformer';

export class ChangeDeletedStateDataDto implements BaseDto {
  @IsDefined({ always: true })
  @Type(() => Boolean)
  public readonly deleted: boolean;
}
