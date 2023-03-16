import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import "styles/global.css"

const NextNProgress = dynamic(
  () => import("nextjs-progressbar").then((mod) => mod.default),
  { ssr: false }
)

const AppHooks = dynamic(() => import("hooks").then((mod) => mod.AppHooks), {
  ssr: false,
})

const AppContexts = dynamic(
  () => import("contexts").then((mod) => mod.AppContexts),
  { ssr: false }
)

const ThemeProvider = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  }
)

const QueryClientProvider = dynamic(
  () => import("@tanstack/react-query").then((mod) => mod.QueryClientProvider),
  {
    ssr: false,
  }
)

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then(
      (mod) => mod.ReactQueryDevtools
    ),
  {
    ssr: false,
  }
)

import { queryClient } from "services/queryClient"

import { Outfit } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <SessionProvider session={session}> */}
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
        <AppContexts>
          <AppHooks>
            <main className={`${outfit.variable} font-sans`}>
              <Component {...pageProps} />
            </main>
          </AppHooks>
        </AppContexts>
        {/* </SessionProvider> */}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
