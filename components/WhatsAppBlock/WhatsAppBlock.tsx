import { CardLine } from "components/Card/CardContentVariants/CardLine"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { EyeSlash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type IWhatsAppBlock = {
  data: {
    phone_number?: string
    data?: string
  }
} & IBlock

type WhatsAppBlockProps = {
  block: IWhatsAppBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const WhatsAppBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: WhatsAppBlockProps) => {
  const text = useTranslation().t

  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: {},
        },
        output: {
          events: events,
          data: {},
        },
      })
  }

  function markdownToWhatsAppLink(phoneNumber: string, text: string): string {
    // Remove HTML tags
    const htmlRemovedText = text.replace(/<\/?[^>]+(>|$)/g, "")

    // Convert markdown text to plain text
    const plainText = htmlRemovedText
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markup (**text**)
      .replace(/__(.*?)__/g, "$1") // Remove underline markup (__text__)
      .replace(/\*(.*?)\*/g, "$1") // Remove italic markup (*text*)
      .replace(/_(.*?)_/g, "$1") // Remove italic markup (_text_)
      .replace(/\~\~(.*?)\~\~/g, "$1") // Remove strikethrough markup (~~text~~)
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // Remove links ([text](url))
      .replace(/(?:\r\n|\r|\n)/g, "%0A") // Replace newlines with URL-encoded newline character
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space

    // Encode plain text for URL
    const encodedText = encodeURIComponent(plainText)

    // Create WhatsApp share link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedText}`

    return whatsappLink
  }

  function handleRedirection() {
    if (!events?.firstInteractionAt) {
      const firstAndLast = new Date().toString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
    } else {
      const lastInteractionAt = new Date().toString()
      handleUpdateEvents({ lastInteractionAt: lastInteractionAt })
    }
    if (!isEditable) {
      let url = markdownToWhatsAppLink(block.data.phone_number, block.data.data)

      if (!/^https?:\/\//i.test(url)) {
        // Add http:// protocol if no protocol specified
        url = "http://" + url
      }
      if (!/^[^:]+:\/\/[^/]+/.test(url)) {
        // Add domain name if not specified
        url = location.protocol + "//" + location.host + "/" + url
      }
      window.location.href = url
    }
    onInteraction()
  }

  useEffect(() => {
    handleRedirection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isEditable ? (
    <div className="flex relative justify-end">
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center  mb-[0.5rem]">
            <div className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
              <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
            </div>
            <p className={`lg:text-[1.1rem] inline-block w-auto font-semibold`}>
              {text("sendtowhatsapp:texttowhats")}
            </p>
          </div>
          <p className={`lg:text-[1.1rem] inline-block w-auto`}>
            {block.data.data}
          </p>
          <CardLine />
          <p
            className={`lg:text-[1.1rem] inline-block w-auto py-1 font-semibold`}
          >
            {text("sendtowhatsapp:title1")}
          </p>
          <CardLine />
          <p className={`lg:text-[1.1rem] inline-block w-auto py-1`}>
            {block.data.phone_number}
          </p>
          <CardLine />
        </div>
      </div>
    </div>
  ) : null
}
