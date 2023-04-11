import dynamic from "next/dynamic"
import { ArrowsOutLineVertical } from "phosphor-react"
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

interface ImageProps extends IBlock {
  data: {
    img_url: string
    height: IHeight
  }
}

interface ImageBlockProps {
  block: ImageProps
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
  handleAddBlock?: (newBlock: BlockProps) => void
}

interface IEvent {
  displayedAt: string
}

export const ImageBlockVideo = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
  handleAddBlock,
}: ImageBlockProps) => {
  const [events, setEvents] = useState<IEvent>()
  const [width, setWidth] = useState<number | undefined>()
  const [height, setHeight] = useState<IHeight>({
    value: null,
    locked_width: null,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const handleResize = useCallback(
    (startY: number, startHeight: number, clientY: number) => {
      const newY = clientY
      const diff = newY - startY
      const newHeight = Math.max(startHeight + diff, 100)
      setHeight({ value: newHeight, locked_width: width })
      handleAddBlock &&
        handleAddBlock({
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
          handleAddBlock &&
            handleAddBlock({
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
    if (block.data && !isEditable) {
      setHeight(block.data.height)
    }
  }, [block.data, isEditable])

  useEffect(() => {
    if (!events?.displayedAt) {
      setEvents({ displayedAt: new Date().toString() })
    }
  }, [events])

  useEffect(() => {
    if (events) {
      handleUpdateInteractions?.({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: block.data.img_url,
        },
        output: {
          events: events,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  useEffect(() => {
    if (isEditable && height.locked_width && height.value) {
      handleAddBlock &&
        handleAddBlock({
          ...block,
          data: {
            ...block.data,
            height: height,
          },
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  // useEffect(() => {
  //   console.log("height", height)
  //   console.log("width", width)
  //   console.log("block", block)
  // }, [width, height, block])

  return (
    <div ref={containerRef} className="flex relative justify-end">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      {block.data.img_url ? (
        <>
          <video
            className="rounded-[20px] lg:rounded-[30px]"
            autoPlay
            loop
            muted
          >
            <source src={block.data.img_url} type="video/mp4" />
          </video>
        </>
      ) : (
        <div className="w-full h-full bg-slate-300 animate-pulse rounded-[20px] lg:rounded-[30px]"></div>
      )}
      {isEditable && (
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-slate-500 rounded-full 
          cursor-row-resize flex justify-center items-center mb-[-6px] lg:mb-[-10px]"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ArrowsOutLineVertical className="text-white" weight="bold" />
        </div>
      )}
    </div>
  )
}