import {
  IoFormattingResult,
  IoFormattingService,
  IoFormattingMode,
} from 'src/app/services/io-formatting-service';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { AppType } from 'src/app/AppType';
import { inject, injectable } from 'inversify';

import { WithNumericIdParameters } from '../common/input-schemas';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { MultiInputReader } from 'src/app/services/multi-input-reader';
import { UseCase } from 'src/domain/kernel/ddd';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces';
import { UseCaseContext, UseCaseResult } from 'src/domain/kernel/use-case';

@injectable()
export class UpdateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.MultiInputReader)
    private readonly multiInputReader: MultiInputReader,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
    this.vendorsRepository = vendorsRepositoryFactory();
  }

  public async run(context: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters, vendorDto] = this.multiInputReader.read(
        context.input,
        [
          (useCaseInput, ioFormattingService) =>
            ioFormattingService.formatObject(
              WithNumericIdParameters,
              useCaseInput.parameters,
              {
                ioFormattingMode: IoFormattingMode.Update,
                inputSection: 'parameters',
              },
            ),
          (useCaseInput, ioFormattingService) =>
            ioFormattingService.formatObject(VendorDto, useCaseInput.data, {
              ioFormattingMode: IoFormattingMode.Update,
              inputSection: 'data',
            }),
        ],
      );
      // const updateVendorEntity: Vendor = this.getEntity(context.input.data);
      const vendorData: Partial<Vendor> = await this.vendorsRepository.updateEntity(
        ((parameters as unknown) as WithNumericIdParameters).id,
        (vendorDto as unknown) as VendorDto,
      );
      const actualVendor = Vendor.build(vendorData);

      return UseCaseResult.success(actualVendor.toDto());
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
  public dispose() {}
}
