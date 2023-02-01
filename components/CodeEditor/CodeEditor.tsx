import "@uiw/react-textarea-code-editor/dist.css"
import dynamic from "next/dynamic"
import { useState } from "react"

const Editor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
)

type CodeEditorProps = {
  initialCodedata: string
  placeHolder?: string
  language: string
  onChange: (data: string) => void
}

export function CodeEditor({
  initialCodedata,
  placeHolder,
  language,
  onChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCodedata)

  function handleChange(text: string) {
    setCode(text)
    onChange(text)
  }

  return (
    <div className="px-2 bg-slate-50">
      <Editor
        value={code}
        language={language}
        placeholder={placeHolder}
        onChange={(e) => handleChange(e.target.value)}
        style={{
          fontSize: 16,
        }}
      />
    </div>
  )
}
