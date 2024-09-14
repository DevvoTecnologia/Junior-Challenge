import axios from "axios";

export interface apiRequest {
  method: "get" | "post" | "delete" | "put" | "patch";
  url: string;
  body?: any;
  header?: any;
}

const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}` || "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}); 

export const api = async ({ method, url, body, header }: apiRequest) => {
  try {
    if (["get", "delete"].includes(method)) {
      return await apiInstance[method](url, { headers: header });
    }

    return await apiInstance[method](url, body, { headers: header });
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro inesperado.');
    } else {
      throw new Error('Erro de rede ou configuração.');
    }
  }
};


