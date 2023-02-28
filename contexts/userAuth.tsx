import Router from "next/router"
import { destroyCookie } from "nookies"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useLogin } from "../services/hooks/useUser/useLogin"
import { queryClient } from "../services/queryClient"
import { IUser } from "../types/User.type"
import { getPayload } from "../utils/auth"
import { appGetCookie } from "../utils/cookies"
import { pageUrls } from "../utils/pagesUrl"

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  user: IUser | null
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>({ type: "registered" })
  const login = useLogin()

  useEffect(() => {
    const token = appGetCookie("token")

    if (token) {
      const userPayload = getPayload(token)

      setUser({ ...userPayload, id: userPayload.sub })
    }
  }, [])

  const contextValue = useMemo(() => {
    return { user, signOut }
  }, [user])

  function signOut() {
    destroyCookie(null, "token")
    destroyCookie(null, "refresh_token")

    caches.keys().then((names) => {
      // Delete all the cache files
      names.forEach((name) => {
        caches.delete(name)
      })
    })

    queryClient.invalidateQueries(["user"])

    Router.push(pageUrls.login())
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

function useUserAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider")
  }

  return context
}

export { AuthProvider, useUserAuth }
