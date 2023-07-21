'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
      retryDelay: 500,
      retryOnMount: true,
    },
  },
} as QueryClientConfig);

interface Props {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
