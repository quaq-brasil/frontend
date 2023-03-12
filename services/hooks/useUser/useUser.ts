import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { useQueryProps } from "types/useQueryProps"
import { IUser } from "types/User.type"

export const useUser = ({ options }: useQueryProps) => {
  const getUser = async () => {
    return api.get(`/users`)
  }

  const response = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    ...options,
  }) as UseQueryResult<{ data: IUser }>

  return response.data
}
