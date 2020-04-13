import { IsInt, Min, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { HasFormattingSchema } from 'src/domain/kernel/building-blocks/types/HasInputSyntaxSchema';

export class WithNumericIdParameters extends HasFormattingSchema {
  @Type(() => Number)
  @IsInt({ always: true })
  @Min(1, { always: true })
  public readonly id: number;

  public static getInputSyntaxSchema() {
    return WithNumericIdParameters;
  }
}
