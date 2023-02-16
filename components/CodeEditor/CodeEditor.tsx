import "@uiw/react-textarea-code-editor/dist.css"
import dynamic from "next/dynamic"
import { BracketsCurly } from "phosphor-react"

const Editor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
)

type CodeEditorProps = {
  code: string
  placeHolder?: string
  language: string
  onChange: (data: string) => void
  handleOpenVariablePanel?: () => void
}

export function CodeEditor({
  code,
  placeHolder,
  language,
  onChange,
  handleOpenVariablePanel,
}: CodeEditorProps) {
  function handleChange(text: string) {
    onChange(text)
  }

  return (
    <div className="px-2 bg-slate-50 relative">
      <div className="flex justify-end items-end">
        {handleOpenVariablePanel ? (
          <button
            onClick={handleOpenVariablePanel}
            className={`absolute top-2 z-10 flex rounded-full border border-slate-100 bg-white
           `}
          >
            <BracketsCurly className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
          </button>
        ) : null}

        <Editor
          value={code}
          language={language}
          placeholder={placeHolder}
          onChange={(e) => handleChange(e.target.value)}
          style={{
            fontSize: 16,
            width: "100%",
          }}
        />
      </div>
    </div>
  )
}
