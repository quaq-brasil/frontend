import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PDF_FILE_PATH = "/test.pdf"

export default function PDFView() {
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
    const targetPage = parseInt(event.currentTarget.elements.pageNumber.value)
    if (targetPage >= 1 && targetPage <= numPages!) {
      setPageNumber(targetPage)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {numPages && (
        <p className="mt-8">
          Page {pageNumber} of {numPages}
        </p>
      )}
      <div className="mb-8">
        <Document
          file={PDF_FILE_PATH}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="flex justify-center">
        <button
          className="mr-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          disabled={pageNumber === 1}
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <form onSubmit={handleGoToPage}>
          <label className="mr-4">
            Page
            <input
              className="ml-1 py-2 px-4 border rounded"
              type="number"
              name="pageNumber"
              defaultValue={pageNumber}
              min={1}
              max={numPages}
            />
          </label>
          <button className="mr-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded">
            Go
          </button>
        </form>
        <button
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          disabled={pageNumber === numPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}
