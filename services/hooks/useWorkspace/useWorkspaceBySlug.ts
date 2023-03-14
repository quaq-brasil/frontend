import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { useQueryProps } from "types/useQueryProps"
import { IWorkspace } from "types/Workspace.type"

type useWorkspaceBySlugProps = {
  slug: string
} & useQueryProps

export const useWorkspaceBySlug = ({
  slug,
  options,
}: useWorkspaceBySlugProps) => {
  const getWorkspaceBySlug = async () => {
    return api.get(`/workspaces/slug/${slug}`)
  }

  const response = useQuery({
    queryKey: ["getWorkspaceBySlug", slug],
    queryFn: getWorkspaceBySlug,
    ...options,
  }) as UseQueryResult<{ data: IWorkspace }>

  return response.data
}
