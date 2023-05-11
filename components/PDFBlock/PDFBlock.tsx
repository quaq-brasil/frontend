import { useDebounce } from "hooks/useDebouce"
import { ArrowsOutLineVertical } from "phosphor-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { BlockProps, IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface IHeight {
  value: number | null
  locked_width: number | null
}

interface PDFProps extends IBlock {
  data: {
    link: string
    height: IHeight
  }
}

interface PDFBlockProps {
  block: PDFProps
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
  handleAddBlock?: (newBlock: BlockProps) => void
}

interface IEvent {
  displayedAt: string
}

export default function PDFBlock({
  block,
  isEditable,
  handleAddBlock,
  handleUpdateInteractions,
  onDelete,
  onEdit,
}: PDFBlockProps) {
  const [events, setEvents] = useState<IEvent>()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [width, setWidth] = useState<number | undefined>()
  const [height, setHeight] = useState<IHeight>({
    value: null,
    locked_width: null,
  })
  const [localBlockData, setLocalBlockData] = useState<PDFProps>()

  const debouncedLocalBlockData = useDebounce({
    value: localBlockData,
    delay: 1000 * 0.25,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  function handleUpdateLocalBlockData(newBlockData: PDFProps) {
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

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
  }

  function onDocumentLoadError(error: Error) {
    // Handle PDF file load error
    console.error("Failed to load PDF file:", error)
  }

  function handlePrevPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1)
  }

  function handleNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  function handleGoToPage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const targetPage = parseInt(
      // @ts-ignore
      event?.currentTarget?.elements?.pageNumber?.value
    )
    if (targetPage >= 1 && targetPage <= numPages!) {
      setPageNumber(targetPage)
    }
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
  }, [events])

  useEffect(() => {
    if (events) {
      handleUpdateInteractions?.({
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
      <div
        className={`relative min-w-full h-full rounded-[20px] lg:rounded-[30px] overflow-hidden`}
      >
        <object
          data={block?.data?.link}
          type="application/pdf"
          className={` ${
            isFullscreen
              ? "fixed right-0 left-0 top-23 lg:top-56 lg:left-24 lg:right-24 z-50 lg:w-2/3 mx-auto hidden md:block"
              : "absolute"
          }    w-full  h-full overflow-scroll scrollbar-hide`}
        />
        <div className="overflow-hidden max-w-fit flex flex-col items-center justify-center min-h-screen mx-auto md:hidden">
          {numPages && (
            <p className="">
              Page {pageNumber} of {numPages}
            </p>
          )}

          <div className="flex justify-center">
            <button
              className="max-h-12 px-4 bg-black text-white rounded"
              disabled={pageNumber === 1}
              onClick={handlePrevPage}
            >
              Prev
            </button>
            <form onSubmit={handleGoToPage} className="flex">
              <label className="mr-4 ml-2 flex items-center">
                Page
                <input
                  className="ml-1 py-2 w-full text-center border rounded"
                  type="number"
                  name="pageNumber"
                  defaultValue={pageNumber}
                  min={1}
                  max={numPages}
                />
              </label>
              <button className="mr-4 max-h-12 px-4 bg-black text-white rounded">
                Go
              </button>
            </form>
            <button
              className="max-h-12 px-4 bg-black text-white rounded"
              disabled={pageNumber === numPages}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>

          <div
            className={`overflow-scroll w-fit max-w-fit pt-2 px-4 h-screen scrollbar-hide`}
          >
            <Document
              file={block?.data?.link}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              externalLinkRel="noopener noreferrer"
              externalLinkTarget="_blank"
            >
              <Page
                className={`absolute w-full ${
                  isFullscreen ? "h-full" : "h-60"
                } overflow-scroll scrollbar-hide`}
                width={390}
                pageNumber={pageNumber}
                scale={1}
              />
            </Document>
          </div>
        </div>
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
