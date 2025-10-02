import { IErrorHandler } from "../models";

export class NetworkErrorHandler implements IErrorHandler {
  handle(error: any) {
    console.error("Network error:", error.message);
    // Handle network-specific UI logic here
  }
}
