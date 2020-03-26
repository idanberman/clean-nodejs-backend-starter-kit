import { IsInt, Min, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { HasInputSyntaxSchema } from 'src/domain/kernel/building-blocks/HasInputSyntaxSchema';

export class WithNumericIdParameters extends HasInputSyntaxSchema {
  @Type(() => Number)
  @IsInt({ always: true })
  @Min(1, { always: true })
  public readonly id: number;

  public static getInputSyntaxSchema() {
    return WithNumericIdParameters;
  }
}
