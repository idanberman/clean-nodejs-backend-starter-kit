export enum UseCaseTerminationStatus {
  //  200/202
  Succeed = 'Succeed',
  // 401
  Unauthorized = 'Unauthorized',
  // 403
  InsufficientPermissions = 'InsufficientPermissions',

  // Id for edit that doesn't exist, is a bad input
  // 400
  InputSyntaxError = 'InputSyntaxError',

  // 422 Unprocessable Entity
  UnableProcessInput = 'UnableProcessInput',

  // For Read Operation
  // 404
  NotFound = 'NotFound',
  // Operation failed caused by the service and not by the user
  InternalError = 'InternalError',
}
