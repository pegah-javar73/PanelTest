import type { HttpClient } from "../core/httpClient";

export class HttpService {
  constructor(private client: HttpClient) {}

  setHeaders(headers: Record<string, string>): void {
    this.client.setHeaders(headers);
  }
  get<T>(url: string, config?: any): Promise<T> {
    return this.client.get<T>(url, config);
  }

  post<T, D = unknown>(url: string, data?: D, config?: any): Promise<T> {
    return this.client.post<T, D>(url, data, config);
  }

  put<T, D = unknown>(url: string, data?: D, config?: any): Promise<T> {
    return this.client.put<T, D>(url, data, config);
  }

  delete<T>(url: string, config?: any): Promise<T> {
    return this.client.delete<T>(url, config);
  }
}
