import { AxiosAdapter } from "../adapters/axiosAdapter";
import { FetchAdapter } from "../adapters/fetchAdapter";
import type { HttpClient } from "../core/httpClient";
import { tokenHandler } from "../core/tokenHandler";

type Method =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "Post"
  | "POST"
  | "Get"
  | "GET"
  | "Put"
  | "PUT"
  | "Delete"
  | "DELETE"
  | "PATCH";

type ClientType = "axios" | "fetch";

interface ApiInstanceParams {
  url: string;
  method: Method;
  client?: ClientType;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  baseURL?: string;
  signal?: AbortSignal;
}

export const apiInstance = async <T>({
  url,
  method,
  client = "axios",
  data,
  params,
  headers = {},
  baseURL = "https://reqres.in",
}: ApiInstanceParams): Promise<T> => {

  let httpClient: HttpClient;
  // ----------------------------
  switch (client) {
    case "fetch":
      httpClient = new FetchAdapter(baseURL);
      break;
    case "axios":
    default:
      httpClient = new AxiosAdapter(baseURL);
      break;
  }
  // ----------------------------

  // Build final headers with automatic handling
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers, // Allow override of default headers
  };
  
  // Add authorization header automatically if token exists
  const authHeader = tokenHandler.getAuthorizationHeader();
  if (authHeader) {
    finalHeaders.Authorization = authHeader;
  }
  
  // Add x-api-key for reqres.in API calls automatically
  if (baseURL?.includes('reqres.in')) {
    finalHeaders['x-api-key'] = 'reqres-free-v1';
  }
  
  
  httpClient.setHeaders(finalHeaders);
  // ----------------------------

  let fullUrl = url;
  if (params && typeof params === "object") {
    const query = new URLSearchParams(params).toString();
    fullUrl += `?${query}`;
  }
  // ----------------------------

  switch (method.toLowerCase()) {
    case "get":
      return httpClient.get<T>(fullUrl);
    case "post":
      return httpClient.post<T>(fullUrl, data);
    case "put":
      return httpClient.put<T>(fullUrl, data);
    case "patch":
      return httpClient.patch<T>(fullUrl, data);
    case "delete":
      return httpClient.delete<T>(fullUrl);
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
};
