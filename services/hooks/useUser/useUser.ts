import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IUser } from "./../../../types/User.type"

type useUserProps = {
  id: string
} & useQueryProps

export const useUser = ({ id, options }: useUserProps) => {
  const getUser = async () => {
    return api.get(`/users/${id}`)
  }

  const response = useQuery({
    queryKey: ["getUser", id],
    queryFn: getUser,
    ...options,
  }) as UseQueryResult<{ data: IUser }>

  return response.data
}
