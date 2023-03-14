import { ThemeProvider } from "@material-tailwind/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AppContexts } from "contexts"
import { AppHooks } from "hooks"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { queryClient } from "services/queryClient"
import "styles/global.css"
const NextNProgress = dynamic(
  () => import("nextjs-progressbar").then((mod) => mod.default),
  { ssr: false }
)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
