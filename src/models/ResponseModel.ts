export interface GeneralResponse<T> {
    success: boolean;
    status: string;
    data?: T;
  }
  