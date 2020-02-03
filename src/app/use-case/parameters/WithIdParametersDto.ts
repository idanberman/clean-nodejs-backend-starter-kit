import { IsInt, Min } from 'class-validator';

export class WithIdParametersDto {
  @IsInt({ always: true })
  @Min(1, { always: true })
  id: number;
}
