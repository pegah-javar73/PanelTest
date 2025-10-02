import { AxiosError } from "axios";
import { extractErrorMessages } from "./extractErrorMessages";
import {
  IErrorPayload,
  pushError,
} from "@/libs/shared-components/error-snackbar/errorSnackbarEmmiter";

export function dispatchErrorMessages(error: AxiosError, causeTitle: string) {
  const messages = extractErrorMessages(error);

  if (messages.length) pushError(stackBarPayloadResolver(messages, causeTitle));
}

export function dispatchManualErrorMessages(
  messages: string[],
  causeTitle: string
) {
  // const messages = extractErrorMessages(error);

  if (messages.length) pushError(stackBarPayloadResolver(messages, causeTitle));
}

function stackBarPayloadResolver(
  messages: string[],
  causeTitle?: string
): IErrorPayload[] {
  return messages.map((mes) => ({ error: mes, title: causeTitle }));
}
