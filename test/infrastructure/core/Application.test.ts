import { UseCaseContext } from 'src/app/use-case/context';
import { Application, ApplicationFactory } from 'src/infrastructure/core';
import { AppType } from 'src/app/AppType';
import { InfrastructureType } from 'src/infrastructure/InfrastructureType';

describe('Application.class', () => {
  describe('createUseCaseContext.method', () => {
    it('should create a use case context', () => {
      const application = new Application();

      const useCaseContext = application.createUseCaseContext(
        {
          parameters: 'data test',
          data: 'data test',
        },
        {
          userId: 'user test ID',
        },
      );

      expect(useCaseContext).toEqual({
        input: {
          parameters: 'data test',
          data: 'data test',
        },
        securityContext: {
          userId: 'user test ID',
        },
      });
    });
  });

  describe('getConfiguration.method', () => {
    it('should return a configuration', () => {
      const application = new Application();

      const configuration = application.getConfiguration();

      expect(configuration.database).toBeDefined();
      expect(configuration.webServer).toBeDefined();
    });
  });

  describe('getUseCase.method', () => {
    it('should throw an error if application is not unitized yet', () => {
      const application = new Application();

      expect(() => {
        application.getUseCase(AppType.IndexVendorsUseCase);
      }).toThrowError();
    });
    it('should create a use case context', async () => {
      const findAllMock = jest.fn();
      const repositoryMock = jest.fn().mockImplementation(() => ({
        findAll: findAllMock(),
      }));

      const typeormRepositoryFactoryServiceMock = jest
        .fn()
        .mockImplementation(() => ({
          resourceId: 'mocked typeorm service',
          register: jest.fn(),
          asyncInit: jest.fn().mockResolvedValue(undefined),
        }));
      const factory = new ApplicationFactory();
      const application = await factory.uninitializedApp();
      application.injectMock(
        InfrastructureType.TypeormRepositoryFactoryService,
        typeormRepositoryFactoryServiceMock(),
      );
      await application.asyncInit();
      application.injectMock(AppType.VendorsRepository, repositoryMock);

      const useCase = application.getUseCase(AppType.IndexVendorsUseCase);
      expect(useCase.run).toBeDefined();
      expect(repositoryMock).toBeCalled();
      expect(findAllMock).toBeCalled();
    });
  });

  describe('test injectMock() and getUseCase()', () => {
    it('should return the injected value', () => {
      const injectMockMethodMock = jest.fn();
      const applicationDIContainerMock = jest.fn().mockImplementation(() => ({
        injectMock: injectMockMethodMock(),
      }));
      const application = new Application();

      // Cheat to prevent exception ('not initialized').
      // We are testing the DI, so other things are not important.
      (application as any).appInitialized = true;
      const injectionId = Symbol.for('testingInjectionId');
      const value = { a: 'test' };

      application.injectMock(injectionId, value);
      expect(application.getUseCase(injectionId)).toEqual(value);
    });
  });

  describe('loadGateway() and startApp()', () => {
    it('should call start() method on the loaded gateway', async () => {
      const startMethodMock = jest.fn();
      const loadMethodMock = jest.fn();
      const gatewayMock = jest.fn().mockImplementation(() => ({
        start: startMethodMock,
        load: loadMethodMock,
      }));
      const application = new Application();

      try {
        await application.startApp();
        throw new Error('test failed');
      } catch (error) {
        expect(error.message).toEqual('Application did not initialized yet');
      }

      // Cheat to prevent exception ('not initialized').
      // We are testing the DI, so other things are not important.
      application.loadGateway(gatewayMock());
      (application as any).appInitialized = true;

      try {
        application.loadGateway(gatewayMock());
        throw new Error('test failed');
      } catch (error) {
        expect(error.message).toEqual('Application already initialized');
      }

      await application.startApp();

      expect(startMethodMock).toBeCalled();

      try {
        await application.startApp();
        throw new Error('test failed');
      } catch (error) {
        expect(error.message).toEqual('Application already started');
      }
    });
  });

  describe('dispatchUseCase.method', () => {
    it('should throw error if app not initialized', async () => {
      const startMethodMock = jest.fn();
      const loadMethodMock = jest.fn();
      const gatewayMock = jest.fn().mockImplementation(() => ({
        start: startMethodMock,
        load: loadMethodMock,
      }));
      const application = new Application();

      try {
        await application.startApp();
        throw new Error('test failed');
      } catch (error) {
        expect(error.message).toEqual('Application did not initialized yet');
      }

      // Cheat to prevent exception ('not initialized').
      // We are testing the DI, so other things are not important.
      application.loadGateway(gatewayMock());
      (application as any).appInitialized = true;

      try {
        application.loadGateway(gatewayMock());
        throw new Error('test failed');
      } catch (error) {
        expect(error.message).toEqual('Application already initialized');
      }

      await application.startApp();

      expect(startMethodMock).toBeCalled();

      try {
        await application.startApp();
        throw new Error('test failed');
      } catch (error) {
        expect(error.message).toEqual('Application already started');
      }
    });
  });
});
