import { useQuery } from "@tanstack/react-query";

import { HttpClient } from "../@types/http-types";

type TUseFetchProps = {
  url: string;
  httpClient: HttpClient;
  queryKey: string;
};

export function useFetch<T = any>({
  url,
  httpClient,
  queryKey,
}: TUseFetchProps) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: () => {
      return httpClient.request({
        url,
        method: "get",
      });
    },
  });
}
