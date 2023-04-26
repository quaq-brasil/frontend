import dynamic from "next/dynamic"
import { ReactNode } from "react"

interface ContextsProps {
  children: ReactNode
}

const TermsProvider = dynamic(
  () => import("./useTerms").then((mod) => mod.TermsProvider),
  { ssr: true }
)

const AuthProvider = dynamic(
  () => import("./userAuth").then((mod) => mod.AuthProvider),
  { ssr: true }
)

export function AppContexts({ children }: ContextsProps) {
  return (
    <AuthProvider>
      <TermsProvider>{children}</TermsProvider>
    </AuthProvider>
  )
}
