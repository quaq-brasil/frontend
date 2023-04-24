import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PDF_FILE_PATH = "/test.pdf"

export default function PDFBlock() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

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
    <div className="min-w-[100%]">
      <object
        data={PDF_FILE_PATH}
        type="application/pdf"
        className="w-full  h-screen overflow-scroll scrollbar-hide"
      >
        <div className="overflow-hidden max-w-fit flex flex-col items-center justify-center min-h-screen mx-auto">
          {numPages && (
            <p className="mt-8">
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

          <div className="overflow-scroll w-fit max-w-fit pt-2 px-4 h-screen scrollbar-hide">
            <Document
              file={PDF_FILE_PATH}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <Page
                className="max-w-[10px] h-screen"
                width={390}
                pageNumber={pageNumber}
                scale={1}
              />
            </Document>
          </div>
        </div>
      </object>
    </div>
  )
}
