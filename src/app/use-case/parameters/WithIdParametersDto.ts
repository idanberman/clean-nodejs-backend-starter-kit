import { IsInt, Min, IsNumberString } from 'class-validator';
import { BaseDto } from 'src/domain/interfaces';
import { Type } from 'class-transformer';

export class WithIdParametersDto implements BaseDto {
  @Type(() => Number)
  @IsInt({ always: true })
  @Min(1, { always: true })
  public readonly id: number;
}
