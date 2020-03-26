import { InternalServiceError } from './InternalServiceError';

export class DomainErrorToUseCaseResultMappingError extends InternalServiceError {
  constructor(
    mapperComponentName,
    mapperActionName,
    mappingError,
    originalError,
  ) {
    super(mapperComponentName, mapperActionName, mappingError, {
      originalError,
    });
  }
}
