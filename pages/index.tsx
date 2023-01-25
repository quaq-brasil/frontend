import { useCreateFile } from "../services/hooks/useFile/useCreateFile"

export default function Home() {
  const createFile = useCreateFile()

  const onClick = () => {
    createFile.mutate({
      name: "test",
      url: "1",
      type: "image",
      size: 1000,
      mime_type: "image/jpeg",
      metadata: {
        key: "value",
      },
    })
  }

  return (
    <button onClick={onClick}>
      <p>text</p>
    </button>
  )
}
