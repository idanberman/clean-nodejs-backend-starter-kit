import { InternalServiceError } from '../../errors/operation';

type InputSyntaxSchema = any;

export abstract class HasFormattingSchema {
  public static getInputSyntaxSchema(): InputSyntaxSchema {
    throw new InternalServiceError(
      typeof this,
      'getInputSyntaxSchema()',
      new Error('getInputSyntaxSchema() is not defined'),
    );
  }
}
