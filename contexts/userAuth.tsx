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
        id: "63d26f06ea1e68c873e97ab2",
        email: "filipi@gmail.com",
        type: "registered",
        email_verified: true,
        name: "felps",
        workspace_id: "63dd14cdc3a3b5901c1675ff",
        avatar_url:
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80",
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