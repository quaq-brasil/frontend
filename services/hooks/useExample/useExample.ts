import { useQuery } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"

export const useExample = ({ options }: useQueryProps) => {
  const getExample = async () => {
    await api.get("/example")
  }

  return useQuery({
    queryKey: ["example"],
    queryFn: getExample,
    ...options,
  })
}
