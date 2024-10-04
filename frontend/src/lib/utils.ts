import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRouteTitle = (pathname: string): string => {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/account":
      return "Configurações de conta";
    case "/aneis/create":
      return "Criar Anel";
    case "/aneis/show":
      return "Visualizar Anéis";
    default:
      return "Página não encontrada";
  }
};
