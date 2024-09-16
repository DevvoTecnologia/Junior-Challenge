"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface iProps {
  children: React.ReactNode;
}

export default function ReactQueryProvider({ children }: iProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
