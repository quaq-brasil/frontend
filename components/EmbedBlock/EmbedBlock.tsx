import dynamic from "next/dynamic"
import { ArrowsVertical } from "phosphor-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
})

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type IData = {
  link: string
  height?: string
}

type IEmbedBlock = {
  data: IData
} & IBlock

type EmbedBlockProps = {
  block: IEmbedBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
  handleAddBlock?: (newBlock: IEmbedBlock) => void
}

type IEvent = {
  displayedAt: string
}

export const EmbedBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
  handleAddBlock,
}: EmbedBlockProps) => {
  const [events, setEvents] = useState<IEvent>()
  const [height, setHeight] = useState<string>(block.data.height || "36rem")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (block.data.height) {
      setHeight(block.data.height)
    }
  }, [block.data.height])

  const handleResize = useCallback(
    (startY: number, startHeight: number, clientY: number) => {
      const newY = clientY
      const diff = newY - startY
      const newHeight = Math.max(startHeight + diff, 100)
      const finalHeight = `${newHeight}px`
      setHeight(finalHeight)
      handleAddBlock &&
        handleAddBlock({
          ...block,
          data: { ...block.data, height: finalHeight },
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
    if (!events?.displayedAt) {
      setEvents({ displayedAt: new Date().toString() })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div
      ref={containerRef}
      className="flex relative justify-end"
      style={{ height }}
    >
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex relative justify-between items-center
        min-w-[100%] bg-white
        p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <ReactPlayer
          url={block.data.link}
          controls
          width="100%"
          height="100%"
        />
      </div>
      {isEditable && (
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-slate-500 rounded-full 
          cursor-row-resize flex justify-center items-center"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ArrowsVertical className="text-white" weight="bold" />
        </div>
      )}
    </div>
  )
}
