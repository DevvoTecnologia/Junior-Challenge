export type ApiResponseType<T> = {
  data?: T;
  success: boolean;
  message: string;
};

export default class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;

  constructor({ data, success, message }: ApiResponseType<T>) {
    this.data = data;
    this.success = success;
    this.message = message;
  }
}
