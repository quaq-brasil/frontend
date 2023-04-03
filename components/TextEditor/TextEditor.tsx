import HighLight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import classNames from "classnames"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect } from "react"

type TextEditorProps = {
  content?: string
  onChange?: (content: string) => void
  handleOpenVariablePanelForText?: () => void
  errors?: string[] | null
}

export function TextEditor({
  content,
  onChange,
  handleOpenVariablePanelForText,
  errors,
}: TextEditorProps) {
  const { t } = useTranslation()

  const editor = useEditor({
    extensions: [
      StarterKit,
      HighLight,
      Typography,
      Placeholder.configure({
        placeholder: t("texteditor:placeholder"),
        emptyEditorClass: classNames(
          "before:content-[attr(data-placeholder)]",
          "before:text-slate-500",
          "before:h-0",
          "before:float-left",
          "before:pointer-events-none"
        ),
      }),
    ],
    content,
    autofocus: "end",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: classNames(
          "prose",
          "text-lg",
          "prose-headings:m-0",
          "prose-p:m-0",
          "prose-p:empty:h-5",
          "focus:outline-none",
          "bg-white",
          "min-h-[11.25rem]",
          "min-w-full",
          "mt-2",
          "px-3"
        ),
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor?.getHTML()) {
      editor?.chain()?.focus()?.setContent(content)?.run()
    }
  }, [content, editor])

  useEffect(() => {
    return () => {
      editor?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <EditorContent editor={editor} />
      </div>
      {errors &&
        errors.length > 0 &&
        errors.map((error) => (
          <p
            key={error}
            className="text-red-500 lg:text-[1.1rem] px-3 lg:pl-[1.125rem] text-left"
          >
            {error}
          </p>
        ))}
    </div>
  )
}
