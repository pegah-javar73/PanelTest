import { AxiosError } from "axios";
import _ from "lodash";

export function extractErrorMessages(error: AxiosError): string[] {
  return _.get(error, ["response", "data", "message"], []);
}
