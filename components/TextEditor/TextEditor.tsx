import HighLight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import useTranslation from "next-translate/useTranslation"

type TextEditorProps = {
  content?: string
  onChange?: (content: string) => void
}

function TextEditor({ content, onChange }: TextEditorProps) {
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
        class: "prose prose-headings:mt-0 focus:outline-none",
      },
    },
  })

  return (
    <div>
      <EditorContent
        className="w-full px-3 bg-white min-h-[11.25rem]"
        editor={editor}
      />
    </div>
  )
}

export default TextEditor
