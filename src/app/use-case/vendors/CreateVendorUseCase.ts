import { inject, injectable } from 'inversify';
import { UseCaseResult } from 'src/app/use-case/results';
import { InputSyntaxError } from 'src/domain/errors/operation';
import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import {
  InputService,
  InputReadingResult,
  InputReadingMode,
} from 'src/app/services/input';
import { UseCase } from '../definitions';
import { AppType } from 'src/app/AppType';
import { DomainErrorToUseCaseResultMapper } from '../services';
import { InstanceFactory } from 'src/infrastructure/core/interfaces';
import { UseCaseContext } from '../context';

@injectable()
export class CreateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.InputService)
    private readonly inputService: InputService,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
    this.vendorsRepository = vendorsRepositoryFactory();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}

  private getEntity(entityParameters: any): Vendor {
    const inputReadingResult: InputReadingResult = this.inputService.validInputFromFreeShapeObject(
      VendorDto,
      entityParameters,
      { inputReadingMode: InputReadingMode.Create, inputSection: 'data' },
    );

    if (!inputReadingResult.isSucceed()) {
      throw new InputSyntaxError(inputReadingResult.fieldSyntaxErrors);
    }

    return Vendor.build(inputReadingResult.getValue<Vendor>());
  }

  public async run(context: UseCaseContext): Promise<UseCaseResult> {
    try {
      const createVendorEntity: Vendor = this.getEntity(context.input.data);
      const actualVendorDto: VendorDto = await this.vendorsRepository.createEntity(
        createVendorEntity,
      );
      return UseCaseResult.success(actualVendorDto);
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
}
