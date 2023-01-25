import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
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
        <AppHooks>
          <Component {...pageProps} />
        </AppHooks>
      </SessionProvider>
    </QueryClientProvider>
  )
}
