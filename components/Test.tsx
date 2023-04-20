import pdfjsLib, { PDFPageProxy } from "pdfjs-dist"
import "pdfjs-dist/build/pdf.worker.min.js"
import React, { useEffect, useRef } from "react"

type PdfViewerProps = {
  url: string
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    pdfjsLib.getDocument(url).promise.then((pdf) => {
      pdf.getPage(1).then((page: PDFPageProxy) => {
        const scale = 1.5
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        canvas.width = viewport.width
        canvas.height = viewport.height

        page.render({ canvasContext: context, viewport })

        container.appendChild(canvas)
      })
    })
  }, [url])

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />
}

export default PdfViewer
