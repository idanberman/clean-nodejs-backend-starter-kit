import { UseCase } from 'src/app/use-case';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { injectable, inject } from 'inversify';
import { AppType } from '../AppType';
import { UseCaseSucceedResult } from 'src/app/use-case/results/UseCaseSucceedResult';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { UseCaseContext } from '../context/UseCaseContext';
import { InstanceFactory } from '../interfaces/InstanceFactory';
import {
  InputService,
  InputReceivingResult,
  InputReceivingMode,
  InputReceivingSuccessResult,
  InputReceivingFailedResult,
} from '../services/input';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { DomainErrorToUseCaseResultConverter } from '../services/DomainErrorToUseCaseResultConverter';

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

  private getEntity(context: UseCaseContext): Vendor {
    const inputReceivingResult: InputReceivingResult = this.inputService.receiveInputFromObject(
      VendorDto,
      context.input.data,
      { inputReceivingMode: InputReceivingMode.Create },
    );

    if (!inputReceivingResult.isSucceed()) {
      throw new InputSyntaxError(
        (inputReceivingResult as InputReceivingFailedResult).fieldSyntaxErrors,
      );
    }

    return Vendor.build(
      (inputReceivingResult as InputReceivingSuccessResult<Vendor>).value,
    );
  }

  public async run(context: UseCaseContext): Promise<UseCaseResult> {
    try {
      const createVendorEntity: Vendor = this.getEntity(context);
      const actualVendorDto: VendorDto = await this.vendorsRepository.createEntity(
        createVendorEntity,
      );
      return new UseCaseSucceedResult(actualVendorDto);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
}
