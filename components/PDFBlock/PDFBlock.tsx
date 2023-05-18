import { useEffect, useState } from "react"
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

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
  }

  function onDocumentLoadError(error: Error) {
    console.log("Failed to load PDF file:", error)
    console.log("PDF link:", block.data.link)
  }

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

  return (
    <div className="flex relative justify-end select-none w-full h-40">
      <div
        className={`relative min-w-full h-full rounded-[20px] lg:rounded-[30px] overflow-hidden`}
      >
        <Document
          file={block.data.link}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading="Loading..."
          externalLinkRel="noopener noreferrer"
          externalLinkTarget="_blank"
        >
          <Page
            className={`absolute w-full h-60 overflow-scroll scrollbar-hide`}
            width={390}
            pageNumber={0}
            scale={1}
          />
        </Document>
      </div>
    </div>
  )
}
