import { destroyCookie } from "nookies"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useCreateUser } from "services/hooks/useUser/useCreateUser"
import { queryClient } from "services/queryClient"
import { IUpdateUser } from "types/User.type"
import { getPayload } from "utils/auth"
import { appGetCookie, appSetCookies } from "utils/cookies"

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  user: IUpdateUser | null
  signOut: () => void
  createAnonymousUser: () => void
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUpdateUser | null>(null)

  const createUser = useCreateUser()

  useEffect(() => {
    const token = appGetCookie("token")

    if (token) {
      const userPayload = getPayload(token)

      setUser({ ...userPayload, id: userPayload.sub })
    }
  }, [])

  const signOut = useCallback(() => {
    destroyCookie(null, "token")
    destroyCookie(null, "refresh_token")

    caches.keys().then((names) => {
      // Delete all the cache files
      names.forEach((name) => {
        caches.delete(name)
      })
    })

    queryClient.invalidateQueries(["user"])
  }, [])

  const createAnonymousUser = useCallback(() => {
    createUser.mutate(
      { data: {} },
      {
        onSuccess: (data) => {
          setUser(data)

          if (data?.token) {
            appSetCookies("token", data.token)
          }

          if (data?.refresh_token) {
            appSetCookies("refresh_token", data.refresh_token)
          }
        },
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValue = useMemo(() => {
    return { user, signOut, createAnonymousUser }
  }, [user, signOut, createAnonymousUser])

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
