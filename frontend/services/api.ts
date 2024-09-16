const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export interface iRequestConfigs extends RequestInit {
  path: string;
}

export interface iResponse<T = null> {
  data?: T;
  message: string;
  success: boolean;
}

export default async function request<T>({
  path,
  ...configs
}: iRequestConfigs): Promise<iResponse<T>> {
  try {
    const response = await fetch(`${baseUrl}/${path}`, configs);
    const jsonResponse = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = jsonResponse?.message || "An error occurred";
      throw new Error(errorMessage);
    }

    return {
      success: jsonResponse.success,
      data: jsonResponse.data,
      message: jsonResponse.message,
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message,
    };
  }
}
