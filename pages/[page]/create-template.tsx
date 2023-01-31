import CreateTemplate from "../../layouts/main/CreateTemplate/CreateTemplate"
import { usePage } from "../../services/hooks/usePage/usePage"

export default function CreateTemplatePage() {
  const pageResponse = usePage({
    id: "63b754987d02f98b8692255e",
  })

  return <CreateTemplate page={pageResponse?.data} />
}
