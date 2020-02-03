import { UseCase } from 'src/app/use-case';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { injectable, inject } from 'inversify';
import { AppType } from '../AppType';
import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { UseCaseSucceedResult } from 'src/app/use-case/results/UseCaseSucceedResult';
import { ErrorToUseCaseResultConverter } from '../services/ErrorToUseCaseResultConverter';
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

@injectable()
export class CreateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultConverter: ErrorToUseCaseResultConverter;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.InputService)
    private readonly inputService: InputService,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultConverter = new ErrorToUseCaseResultConverter();
    this.vendorsRepository = vendorsRepositoryFactory();
  }
  // tslint:disable-next-line: no-empty
  dispose() {}

  getEntity(
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Vendor {
    const inputReceivingResult: InputReceivingResult = this.inputService.receiveInputFromObject(
      VendorDto,
      context.input.data,
      {
        inputReceivingMode: InputReceivingMode.Create,
      },
    );

    if (!inputReceivingResult.isSucceed()) {
      throw new UseCaseInputSyntaxErrorResult(
        (inputReceivingResult as InputReceivingFailedResult).fieldSyntaxErrors,
      );
    }

    return Vendor.build(
      (inputReceivingResult as InputReceivingSuccessResult<Vendor>).value,
    );
  }

  async run(
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    const createVendorEntity: Vendor = this.getEntity(context, presenter);
    try {
      const actualVendorDto: VendorDto = await this.vendorsRepository.createEntity(
        createVendorEntity,
      );
      return presenter.present(new UseCaseSucceedResult(actualVendorDto));
    } catch (error) {
      return presenter.present(
        this.errorToUseCaseResultConverter.convert(error),
      );
    }
  }
}
