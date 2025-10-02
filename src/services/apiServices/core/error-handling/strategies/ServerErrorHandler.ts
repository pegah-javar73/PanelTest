// strategies/ServerErrorHandler.ts

import { IErrorHandler } from "../models";
import {
  dispatchErrorMessages,
  dispatchManualErrorMessages,
} from "../utils/dispatchErrorMessages";

export class ServerErrorHandler implements IErrorHandler {
  handle(error: any) {
    console.error("Server error:", error.response?.data?.message);
    // Generic fallback UI
    console.log("is server error");
    dispatchManualErrorMessages(["Server Error"], "خطای سمت سرور");
  }
}
