export enum UseCaseTerminationStatus {
  Succeed = 'Succeed',
  Unauthorized = 'Unauthorized',
  InsufficientPermissions = 'InsufficientPermissions',

  // Id for edit (write operation) that doesn't exist, is a bad input
  InputSyntaxError = 'InputSyntaxError',
  UnableProcessInput = 'UnableProcessInput',

  // For Read Operation
  RequestedDataNotFound = 'RequestedDataNotFound',

  // Operation failed caused by the service and not by the user
  InternalError = 'InternalError',
}
