export enum InitializationErrorComponent {
  Config,
  Persistence,
}

export class AppInitializationError extends Error {
  constructor(
    message: string,
    public readonly component: InitializationErrorComponent,
  ) {
    super(message);
  }
}
