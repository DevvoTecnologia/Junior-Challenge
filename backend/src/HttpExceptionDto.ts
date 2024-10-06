export class HttpExceptionDto {
  public message?: string | string[];
  public error!: string;
  public statusCode!: number;
}
