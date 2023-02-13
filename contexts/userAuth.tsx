import { destroyCookie } from "nookies"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { queryClient } from "../services/queryClient"
import { IUser } from "../types/User.type"

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  user: IUser | null
  signOut: () => boolean
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (!user) {
      setUser({
        id: "63ea90f6d2cb853f3cb0f740",
        email: "filip2i@gmail.com",
        type: "registered",
        email_verified: true,
        name: "positivo demo",
        workspace_id: "63ea91a8d2cb853f3cb0f741",
        avatar_url: "https://source.unsplash.com/featured/",
      })
    }
  }, [user])

  function signOut() {
    destroyCookie(undefined, "quaq.token")
    destroyCookie(undefined, "quaq.refresh_token")

    caches.keys().then((names) => {
      // Delete all the cache files
      names.forEach((name) => {
        caches.delete(name)
      })
    })

    queryClient.invalidateQueries(["user"])

    return true
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
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
