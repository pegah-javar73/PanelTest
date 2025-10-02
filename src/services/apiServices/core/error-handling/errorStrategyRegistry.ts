// errorStrategyRegistry.ts
import { IErrorHandler } from "./models";
import { AuthErrorHandler } from "./strategies/AuthErrorHandler";
import { ClientErrorHandler } from "./strategies/ClientErrorHandler";
import { NetworkErrorHandler } from "./strategies/NetworkErrorHandler";
import { ServerErrorHandler } from "./strategies/ServerErrorHandler";
// import { ServerErrorHandler } from './strategies/ServerErrorHandler';

type StrategyMatcher = (error: any) => boolean;

export const errorStrategyRegistry: Array<{
  match: StrategyMatcher;
  handler: IErrorHandler;
}> = [
  {
    match: (error) => !error.response,
    handler: new NetworkErrorHandler(),
  },
  {
    match: (error) => [401, 403].includes(error.response?.status),
    handler: new AuthErrorHandler(),
  },
  {
    match: (error) =>
      error.response?.status >= 400 && error.response?.status < 500,
    handler: new ClientErrorHandler(),
  },
  {
    match: (error) => error.response?.status >= 500,
    handler: new ServerErrorHandler(),
  },
];
