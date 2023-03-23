import { CardLine } from "components/Card/CardContentVariants/CardLine"
import dynamic from "next/dynamic"
import Image from "next/image"
import { EyeSlash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type IData = {
  description?: string
  link?: string
  type?: string
  cover_image?: string
}

type IRedirectBlock = {
  data: IData
} & IBlock

type RedirectBlockProps = {
  block: IRedirectBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const RedirectBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: RedirectBlockProps) => {
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
          data: {
            description: block.data.description,
            link: block.data.link,
            type: block.data.type,
            image: block.data.cover_image,
          },
        },
        output: {
          events: events,
        },
      })
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
      let url = block.data.link
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
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
    }
    if (block.data.type === "auto" && !isEditable) {
      handleRedirection()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {block.data.type === "manual" ? (
        <>
          <button
            onClick={handleRedirection}
            className="flex relative justify-end w-full h-[14rem] lg:h-[19rem]"
          >
            {isEditable === true && (
              <BlockMenu onDelete={onDelete} onEdit={onEdit} />
            )}
            <div
              className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
              right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:rounded-[25px] "
            >
              <div className="flex flex-col gap-1">
                <p className="inline-block pt-[0.625rem] text-center md:text-[1.1rem]">
                  {block.data.description}
                </p>
                <p className="inline-block pb-[0.625rem] text-center text-slate-500 text-[0.875rem] lg:text-[1rem]">
                  {block.data.link}
                </p>
              </div>
            </div>
            <Image
              className="rounded-[20px] lg:rounded-[30px]"
              src={block.data.cover_image}
              fill
              style={{ objectFit: "cover" }}
              alt={""}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              loading="lazy"
            />
          </button>
        </>
      ) : (
        <div
          className={`flex relative justify-center min-w-[100%] bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px] ${
            isEditable ? "block" : "invisible m-[-2rem]"
          }`}
        >
          {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row gap-3 items-center  mb-[0.5rem]">
              <div className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
                <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
              </div>
              <p className={`lg:text-[1.1rem] inline-block w-auto`}>
                {block.data.description}
              </p>
            </div>
            <CardLine />
            <p className={`lg:text-[1.1rem] inline-block w-auto py-1 px-3`}>
              {block.data.link}
            </p>
            <CardLine />
          </div>
        </div>
      )}
    </>
  )
}
