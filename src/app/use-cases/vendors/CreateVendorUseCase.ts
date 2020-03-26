import { inject, injectable } from 'inversify';
import { InputSyntaxError } from 'src/domain/kernel/errors/operation';
import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import {
  IoFormattingService,
  IoFormattingResult,
  IoFormattingMode,
} from 'src/app/services/io-formatting-service';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { UseCase } from 'src/domain/kernel/ddd';
import { UseCaseContext, UseCaseResult } from 'src/domain/kernel/use-case';

@injectable()
export class CreateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.IoFormattingService)
    private readonly ioFormattingServiceService: IoFormattingService,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
    this.vendorsRepository = vendorsRepositoryFactory();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}

  private getEntity(entityParameters: any): Vendor {
    const inputReadingResult: IoFormattingResult = this.ioFormattingServiceService.formatObject(
      VendorDto,
      entityParameters,
      { ioFormattingMode: IoFormattingMode.Create, inputSection: 'data' },
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
