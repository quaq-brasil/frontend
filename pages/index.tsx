import { useCreatePublication } from "../services/hooks/usePublication/useCreatePublication"
import { usePublication } from "../services/hooks/usePublication/usePublication"

export default function Home() {
  const createPublication = useCreatePublication()

  const response = usePublication({
    id: "63ae052efbbce66bbc152487",
  })

  console.log(response?.data)

  const onClick = () => {
    createPublication.mutate({
      data: {
        title: "test",
        blocks: {},
        template_id: "63ae052efbbce66bbc152488",
        page_id: "63ae052efbbce66bbc152488",
      },
    })
  }

  return (
    <button onClick={onClick}>
      <p>text</p>
    </button>
  )
}
