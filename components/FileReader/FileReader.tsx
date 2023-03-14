import workerSrc from "pdf-worker"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

type FileReaderProps = {
  url: string
}

type FileReaderState = {
  numPages: number
}

export function FileReader({ url }: FileReaderProps) {
  const [numPages, setNumPages] = useState(1)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: FileReaderState) {
    setNumPages(nextNumPages)
  }

  return (
    <div>
      <Document
        className="flex flex-col md:justify-center md:items-center py-2"
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            renderMode="canvas"
          />
        ))}
      </Document>
    </div>
  )
}
