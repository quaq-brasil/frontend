import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { useDebounce } from "hooks/useDebouce"
import dynamic from "next/dynamic"
import Image from "next/image"
import { ArrowsOutLineVertical, EyeSlash } from "phosphor-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { BlockProps, IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

interface IHeight {
  value: number | null
  locked_width: number | null
}

type IData = {
  description?: string
  link?: string
  type?: string
  cover_image?: string
  height: IHeight
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
  handleAddBlock?: (newBlock: BlockProps) => void
}

type IEvent = {
  displayedAt?: string
  lastInteractionAt?: string
  firstInteractionAt?: string
}

export const RedirectBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
  handleAddBlock,
}: RedirectBlockProps) => {
  const [events, setEvents] = useState<IEvent>()
  const [width, setWidth] = useState<number | undefined>()
  const [height, setHeight] = useState<IHeight>({
    value: null,
    locked_width: null,
  })
  const [localBlockData, setLocalBlockData] = useState<IRedirectBlock>()

  const debouncedLocalBlockData = useDebounce({
    value: localBlockData,
    delay: 1000 * 0.25,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  function handleUpdateLocalBlockData(newBlockData: IRedirectBlock) {
    setLocalBlockData({ ...localBlockData, ...newBlockData })
  }

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

  const handleResize = useCallback(
    (startY: number, startHeight: number, clientY: number) => {
      const newY = clientY
      const diff = newY - startY
      const newHeight = Math.max(startHeight + diff, 100)
      setHeight({ value: newHeight, locked_width: width })
      handleUpdateLocalBlockData({
        ...block,
        data: {
          ...block.data,
          height: { value: newHeight, locked_width: width },
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block]
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditable) return

    const startY = e.clientY
    const startHeight = containerRef.current?.clientHeight || 0

    const handleMouseMove = (e: MouseEvent) => {
      handleResize(startY, startHeight, e.clientY)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditable) return

    const startY = e.touches[0].clientY
    const startHeight = containerRef.current?.clientHeight || 0

    const handleTouchMove = (e: TouchEvent) => {
      handleResize(startY, startHeight, e.touches[0].clientY)
    }

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)
  }

  useEffect(() => {
    if (debouncedLocalBlockData) {
      handleAddBlock && handleAddBlock(debouncedLocalBlockData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLocalBlockData])

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.getBoundingClientRect().width
        setWidth(newWidth)

        if (isEditable && height.locked_width === null) {
          setHeight((prevState) => ({
            ...prevState,
            value: block.data.height.value || 420,
            locked_width: block.data.height.locked_width || newWidth,
          }))
          handleUpdateLocalBlockData({
            ...block,
            data: {
              ...block.data,
              height: { value: 420, locked_width: newWidth },
            },
          })
        }
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable, height.locked_width, block])

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
          <div
            onClick={handleRedirection}
            className="flex relative justify-end w-full h-[14rem] lg:h-[19rem] cursor-pointer select-none"
            ref={containerRef}
            style={{
              height: height.locked_width
                ? `${height.value * (width / height.locked_width)}px`
                : `${height.value}px`,
            }}
          >
            {isEditable === true && (
              <BlockMenu onDelete={onDelete} onEdit={onEdit} />
            )}
            <div
              className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
              right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:rounded-[25px] select-none"
            >
              <div className="flex flex-col gap-1 select-none">
                <p className="inline-block pt-[0.625rem] text-center md:text-[1.1rem]">
                  {block.data.description}
                </p>
                <p className="inline-block pb-[0.625rem] text-center text-slate-500 text-[0.875rem] lg:text-[1rem]">
                  {block.data.link}
                </p>
              </div>
            </div>
            <Image
              className="rounded-[20px] lg:rounded-[30px] select-none"
              src={block.data.cover_image}
              fill
              style={{ objectFit: "cover" }}
              alt={""}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              loading="lazy"
            />
            {isEditable && (
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-slate-500 rounded-full 
          cursor-row-resize flex justify-center items-center mb-[-6px] lg:mb-[-10px] z-10 select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <ArrowsOutLineVertical className="text-white" weight="bold" />
              </div>
            )}
          </div>
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
