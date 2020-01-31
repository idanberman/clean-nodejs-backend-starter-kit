import { ApplicationInterface } from '.';

export interface ApplicationGateway {
  start(): void;
  stop(): void;
  load(applicationInterface: ApplicationInterface);
}
