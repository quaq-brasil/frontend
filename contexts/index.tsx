// import { VariablesProvider } from './VariablesContext/variablesContext';

import { ReactNode } from "react"
import { AuthProvider } from "./userAuth"
import { TermsProvider } from "./useTerms"

interface ContextsProps {
  children: ReactNode
}

export function AppContexts({ children }: ContextsProps) {
  return (
    <TermsProvider>
      <AuthProvider>{children}</AuthProvider>
    </TermsProvider>
  )
}
