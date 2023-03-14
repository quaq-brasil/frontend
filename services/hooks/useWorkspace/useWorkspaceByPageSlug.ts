import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { useQueryProps } from "types/useQueryProps"
import { IWorkspace } from "types/Workspace.type"

type useWorkspaceByPageSlugProps = {
  slug: string
} & useQueryProps

export const useWorkspaceByPageSlug = ({
  slug,
  options,
}: useWorkspaceByPageSlugProps) => {
  const getWorkspaceByPageSlug = async () => {
    return api.get(`/workspaces/page/slug/${slug}`)
  }

  const response = useQuery({
    queryKey: ["getWorkspaceByPageSlug", slug],
    queryFn: getWorkspaceByPageSlug,
    ...options,
  }) as UseQueryResult<{ data: IWorkspace }>

  return response.data
}
