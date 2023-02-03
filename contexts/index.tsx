// import { VariablesProvider } from './VariablesContext/variablesContext';

import { ReactNode } from "react"

interface ContextsProps {
  children: ReactNode
}

export function AppContexts({ children }: ContextsProps) {
  return (
    // <AuthProvider>
    <div>{children}</div>
    // </AuthProvider>
  )
}
