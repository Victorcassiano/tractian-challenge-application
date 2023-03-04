import LazyLoading from '@/components/LazyLoading';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoadingState] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoadingState(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoadingState(false);
    });

    router.events.on("beforeHistoryChange", () => {
      setLoadingState(true);
    });
  }, [router.events]);

  if (isLoading) {
    return <LazyLoading />
  }

  return <Component {...pageProps} />
}
