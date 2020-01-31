import { Controller, Get } from '@tsed/common';

import express from 'express';
import { ExpressJsAdapter } from '../adapter/ExpressJsAdapter';
import { GetAllVendorsUseCase } from 'src/app/vendors';
import { ApplicationInterface } from 'src/app/interfaces';
import { RepositoryId } from 'src/domain/RepositoryId';
import { VendorsRepository } from 'src/domain/vendors';
// @Controller('/vendors')
export class VendorsController {
  private readonly expressToApplicationAdapter: ExpressJsAdapter = new ExpressJsAdapter();
  constructor(
    private readonly applicationInterface: ApplicationInterface, // private readonly useCaseDispatcherService: UseCaseDispatcherService,
  ) {}
  // @Get('/')
  // async getAll(
  //   request: express.Request,
  //   response: express.Response,
  // ): Promise<void> {
  //   await this.useCaseDispatcherService.dispatch(
  //     new GetAllVendorsUseCase(
  //       this.applicationInterface.getRepository(
  //         RepositoryId.VendorsRepository,
  //       ) as VendorsRepository,
  //     ),
  //     this.expressToApplicationAdapter.createUseCaseContextFromRequest(
  //       request,
  //       this.applicationInterface,
  //     ),
  //     this.expressToApplicationAdapter.getPresenter(response),
  //   );
  // }

  // @Get('/:id')
  // async getOne(
  //   request: Express.Request,
  //   response: Express.Response,
  // ): Promise<SuccessResult<Vendor>> {}
}
