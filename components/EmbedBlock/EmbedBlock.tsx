import { useDebounce } from "hooks/useDebounce"
import dynamic from "next/dynamic"
import { ArrowsOutLineVertical } from "phosphor-react"
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

interface IHeight {
  value: number | null
  locked_width: number | null
}

type IData = {
  link: string
  height?: IHeight
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
  const [width, setWidth] = useState<number | undefined>()
  const [height, setHeight] = useState<IHeight>({
    value: null,
    locked_width: null,
  })
  const [localBlockData, setLocalBlockData] = useState<IEmbedBlock>()

  const debouncedLocalBlockData = useDebounce({
    value: localBlockData,
    delay: 1000 * 0.25,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  function handleUpdateLocalBlockData(newBlockData: IEmbedBlock) {
    setLocalBlockData({ ...localBlockData, ...newBlockData })
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
  }, [isEditable, height.locked_width])

  useEffect(() => {
    if (block.data && !isEditable) {
      setHeight(block.data.height)
      setLocalBlockData(block)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.data, isEditable])

  useEffect(() => {
    if (!events?.displayedAt) {
      setEvents({ displayedAt: new Date().toString() })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  useEffect(() => {
    if (events) {
      handleUpdateInteractions?.({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: block.data.link,
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
      handleUpdateLocalBlockData({
        ...block,
        data: {
          ...block.data,
          height: height,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  return (
    <div
      ref={containerRef}
      className="flex relative justify-end select-none"
      style={{
        height: height.locked_width
          ? `${height.value * (width / height.locked_width)}px`
          : `${height.value}px`,
      }}
    >
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex relative justify-between items-center
        min-w-[100%] bg-white rounded-[20px] lg:rounded-[30px] overflow-hidden select-none"
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
          cursor-row-resize flex justify-center items-center mb-[-6px] lg:mb-[-10px] select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ArrowsOutLineVertical className="text-white" weight="bold" />
        </div>
      )}
    </div>
  )
}
