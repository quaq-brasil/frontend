import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import NextNProgress from "nextjs-progressbar"
import { AppContexts } from "../contexts"
import { AppHooks } from "../hooks"
import "../styles/global.css"

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>
        <AppContexts>
          <AppHooks>
            <NextNProgress
              color="#000"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
              options={{
                showSpinner: false,
              }}
            />
            <Component {...pageProps} />
          </AppHooks>
        </AppContexts>
      </SessionProvider>
    </QueryClientProvider>
  )
}
