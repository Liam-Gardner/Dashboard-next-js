import { DarkModeProvider } from '@/providers/DarkModeProvider';
import '@/styles/globals.css';
import Layout from '@/ui/Layout';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps<{ businessName: string }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <Layout businessName={pageProps.businessName}>
          <Component {...pageProps} />
        </Layout>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}
