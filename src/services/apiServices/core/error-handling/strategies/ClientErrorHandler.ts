import { AxiosError } from "axios";
import { IErrorHandler } from "../models";
import { extractErrorMessages } from "../utils/extractErrorMessages";
import { dispatchErrorMessages } from "../utils/dispatchErrorMessages";

export class ClientErrorHandler implements IErrorHandler {
  handle(error: AxiosError) {
    dispatchErrorMessages(error, "خطای سمت کاربر");
  }
}
