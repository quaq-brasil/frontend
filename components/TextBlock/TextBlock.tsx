import HighLight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"
const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.default),
  { ssr: false }
)

type ITextBlock = {
  data: string
} & IBlock

type TextBlockProps = {
  block: ITextBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const TextBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: TextBlockProps) => {
  type IEvent = {
    displayedAt: string
  }

  const [events, setEvents] = useState<IEvent>()

  const editor = useEditor({
    extensions: [StarterKit, HighLight, Typography],
    content: block.data,
    editorProps: {
      attributes: {
        class:
          "prose prose-headings:m-0 prose-p:m-0 focus:outline-none bg-white pointer-events-none select-none h-fit min-w-full my-2 px-3",
      },
    },
  })

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: block.data,
        },
        output: {
          events: events,
        },
      })
  }

  useEffect(() => {
    if (!events?.displayedAt) {
      const event = {
        displayedAt: new Date().toString(),
      }
      setEvents(event)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div className="flex relative min-w-[100%]">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="min-w-[100%] lg:px-1 py-1 bg-white lg:py-[0.75rem]
        rounded-[20px] lg:rounded-[30px] text-black lg:text-[1.1rem]"
      >
        <EditorContent className="" editor={editor} disabled />
      </div>
    </div>
  )
}
