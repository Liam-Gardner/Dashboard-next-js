import { DarkModeProvider } from '@/providers/DarkModeProvider';
import '@/styles/globals.css';
import Layout from '@/ui/Layout';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps<{ businessName: string }>) {
  return (
    <DarkModeProvider>
      <Layout businessName={pageProps.businessName}>
        <Component {...pageProps} />
      </Layout>
    </DarkModeProvider>
  );
}
