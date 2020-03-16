import { ApplicationInterface } from '.';

export interface ApplicationGateway {
  start(): Promise<void>;
  stop(): void;
  load(applicationInterface: ApplicationInterface);
}
