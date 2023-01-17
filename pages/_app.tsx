import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { AppHooks } from "../hooks";
import "../styles/global.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppHooks>
        <Component {...pageProps} />
      </AppHooks>
    </SessionProvider>
  );
}
