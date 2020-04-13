import { IsInt, Min, IsBoolean, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { HasFormattingSchema } from 'src/domain/kernel/building-blocks/types/HasInputSyntaxSchema';

export class ChangeDeletedStateData extends HasFormattingSchema {
  @IsDefined({ always: true })
  @Type(() => Boolean)
  public readonly deleted: boolean;

  public static getInputSyntaxSchema() {
    return ChangeDeletedStateData;
  }
}
