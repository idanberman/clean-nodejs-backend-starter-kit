import { IsInt, Min, IsBoolean, IsDefined } from 'class-validator';
import { BaseDto } from 'src/domain/interfaces';
import { Type } from 'class-transformer';

export class ChangeDeletedStateDataDto implements BaseDto {
  @IsDefined({ always: true })
  @Type(() => Boolean)
  @IsBoolean({ always: true })
  public readonly deleted: boolean;
}
