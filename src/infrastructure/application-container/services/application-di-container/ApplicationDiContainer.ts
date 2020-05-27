export interface ApplicationDiContainer {
  bindApplicationContainer(): void;
  get<T>(constructorFunction: string | symbol): T;
  injectMock<T>(injectionId, value: any): void;
}
