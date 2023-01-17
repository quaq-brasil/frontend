import { ReactNode } from "react";
import { ContextMenuProvider } from "./ContextMenuHook";

interface ContextsProps {
  children: JSX.Element | ReactNode;
}

export function AppHooks({ children }: ContextsProps) {
  return <ContextMenuProvider>{children}</ContextMenuProvider>;
}
