import { IsInt, Min, IsBoolean, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { HasInputSyntaxSchema } from 'src/domain/kernel/building-blocks/HasInputSyntaxSchema';

export class ChangeDeletedStateData extends HasInputSyntaxSchema {
  @IsDefined({ always: true })
  @Type(() => Boolean)
  public readonly deleted: boolean;

  public static getInputSyntaxSchema() {
    return ChangeDeletedStateData;
  }
}
