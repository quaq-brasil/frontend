import "@uiw/react-textarea-code-editor/dist.css"
import dynamic from "next/dynamic"
import { useState } from "react"

const Editor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
)

export function CodeEditor() {
  const [code, setCode] = useState(`{}`)

  function handleChange(text: string) {
    setCode(text)
  }

  const handleParse = () => {
    console.log("json", JSON.parse(code))
  }

  return (
    <div>
      <Editor
        value={code}
        language="json"
        placeholder="Please enter JS code."
        onChange={(e) => handleChange(e.target.value)}
      />

      <button onClick={handleParse}>parse</button>
    </div>
  )
}
