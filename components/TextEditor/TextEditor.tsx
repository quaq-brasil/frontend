import HighLight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect } from "react"

type TextEditorProps = {
  content?: string
  onChange?: (content: string) => void
  handleOpenVariablePanelForText: () => void
}

function TextEditor({
  content,
  onChange,
  handleOpenVariablePanelForText,
}: TextEditorProps) {
  const text = useTranslation().t

  const editor = useEditor({
    extensions: [
      StarterKit,
      HighLight,
      Typography,
      Placeholder.configure({
        placeholder: text("texteditor:placeholder"),
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-slate-500 before:h-0 before:float-left before:pointer-events-none",
      }),
    ],
    content,
    autofocus: "end",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-headings:m-0 prose-p:m-0 focus:outline-none bg-white min-h-[11.25rem] min-w-full mt-2 px-3",
      },
    },
  })

  useEffect(() => {
    if ((content && editor) || (content === "" && editor))
      editor?.chain()?.focus()?.setContent(content)?.run()
  }, [content])

  return (
    <div className="flex relative min-w-[100%] justify-end content-center">
      <div
        onClick={handleOpenVariablePanelForText}
        className="z-10 absolute right-0 top-[-5px] content-center
          rounded-full bg-white border border-slate-100 mr-[10px]"
      >
        <BracketsCurly className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
      </div>
      <div className="w-full">
        <EditorContent className="" editor={editor} />
      </div>
    </div>
  )
}

export default TextEditor
