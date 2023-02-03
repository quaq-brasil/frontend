// import { VariablesProvider } from './VariablesContext/variablesContext';

import { ReactNode } from "react"
import { AuthProvider } from "./userAuth"

interface ContextsProps {
  children: ReactNode
}

export function AppContexts({ children }: ContextsProps) {
  return <AuthProvider>{children}</AuthProvider>
}
