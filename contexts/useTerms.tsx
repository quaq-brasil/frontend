import { parseCookies, setCookie } from "nookies"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useUserAuth } from "./userAuth"

type TermsProviderProps = {
  children: ReactNode
}

type TermsContextData = {
  isCookiesAccepted: boolean
}

export const TermsContext = createContext({} as TermsContextData)

const DEFAULT_COOKIES_ACCEPTED = true

const TermsProvider = ({ children }: TermsProviderProps) => {
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(
    DEFAULT_COOKIES_ACCEPTED
  )

  const { user, createAnonymousUser } = useUserAuth()

  useEffect(() => {
    const { "quaq.is-cookie-accepted": isCookiesAccepted } = parseCookies()

    if (!isCookiesAccepted) {
      setIsCookiesAccepted(false)
      setCookie(undefined, "quaq.is-cookie-accepted", "true", {
        maxAge: 60 * 60 * 24 * 365, // 365 days
        path: "/",
      })
    } else if (isCookiesAccepted && !user?.id) {
      createAnonymousUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValue = useMemo(
    () => ({ isCookiesAccepted }),
    [isCookiesAccepted]
  )

  return (
    <TermsContext.Provider value={contextValue}>
      {children}
    </TermsContext.Provider>
  )
}

function useTerms(): TermsContextData {
  const context = useContext(TermsContext)
  if (!context) {
    throw new Error("useTerms must be used within a TermsProvider")
  }

  return context
}

export { TermsProvider, useTerms }
