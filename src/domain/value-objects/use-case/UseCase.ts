import { BaseDto } from 'src/domain/interfaces';
import { UseCaseResult } from './UseCaseResult';

export interface UseCase<UseCaseInput extends BaseDto> {
  run(useCaseInput: UseCaseInput): Promise<UseCaseResult>;
}
