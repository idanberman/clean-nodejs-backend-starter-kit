import { inject, injectable } from 'inversify';
import { UseCase } from 'src/app/use-case';
import { UseCaseSucceedResult } from 'src/app/use-case/results/UseCaseSucceedResult';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import { AppType } from '../../AppType';
import { UseCaseContext } from '../../context/UseCaseContext';
import { InstanceFactory } from '../../interfaces/InstanceFactory';
import { DomainErrorToUseCaseResultConverter } from '../../services/DomainErrorToUseCaseResultConverter';
import {
  InputService,
  InputReadingResult,
  InputReadingMode,
} from 'src/app/services/input';

@injectable()
export class CreateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultConverter: DomainErrorToUseCaseResultConverter;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.InputService)
    private readonly inputService: InputService,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultConverter = new DomainErrorToUseCaseResultConverter();
    this.vendorsRepository = vendorsRepositoryFactory();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}

  private getEntity(entityParameters: any): Vendor {
    const inputReadingResult: InputReadingResult = this.inputService.validInputFromFreeObject(
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
      return new UseCaseSucceedResult(actualVendorDto);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
}
