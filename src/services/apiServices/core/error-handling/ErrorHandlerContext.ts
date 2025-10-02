// ErrorHandlerContext.ts
import { IErrorHandler } from "./models";

export class ErrorHandlerContext {
  private strategy: IErrorHandler;

  constructor(strategy: IErrorHandler) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IErrorHandler) {
    this.strategy = strategy;
  }

  handle(error: any) {
    this.strategy.handle(error);
  }
}
