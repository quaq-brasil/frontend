import dynamic from "next/dynamic"
import { ReactNode } from "react"

interface ContextsProps {
  children: ReactNode
}

const TermsProvider = dynamic(
  () => import("./useTerms").then((mod) => mod.TermsProvider),
  { ssr: false }
)

const AuthProvider = dynamic(
  () => import("./userAuth").then((mod) => mod.AuthProvider),
  { ssr: false }
)

export function AppContexts({ children }: ContextsProps) {
  return (
    <TermsProvider>
      <AuthProvider>{children}</AuthProvider>
    </TermsProvider>
  )
}
