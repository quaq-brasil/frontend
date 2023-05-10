import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function PDFBlock({ block }: any) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  return (
    <div>
      <button
        className="top-0 right-0 bg-black text-white rounded px-4 py-2"
        onClick={() => setIsFullscreen(!isFullscreen)}
      >
        {isFullscreen ? "Exit" : "Fullscreen"}
      </button>

      <div
        className={`relative min-w-full  ${
          isFullscreen ? "min-h-screen" : "h-96"
        }`}
      >
        <object
          data={block.data.link}
          type="application/pdf"
          className={` ${
            isFullscreen
              ? "fixed right-0 left-0 top-23 lg:top-56 lg:left-24 lg:right-24 z-50 lg:w-2/3 mx-auto"
              : "absolute"
          }    w-full  h-full overflow-scroll scrollbar-hide`}
        >
          <div className="overflow-hidden max-w-fit flex flex-col items-center justify-center min-h-screen mx-auto">
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
                file={block.data.link}
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
        </object>
      </div>
    </div>
  )
}
