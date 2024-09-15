import axios, { AxiosError, AxiosResponse } from "axios";

import { HttpClient, HttpRequest } from "../../@types/http-types";

export class HttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse?.data,
      };
    } catch (error) {
      const _error = error as AxiosError<{ error: string }>;

      if (_error.response) {
        return {
          statusCode: _error.response?.status,
          body: _error.response?.data,
        };
      }
    }
  }
}
