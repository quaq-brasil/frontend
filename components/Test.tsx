import * as pdfjs from "pdfjs-dist"
import { useEffect, useRef } from "react"

// Set the worker script URL
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.js"

function MyPage() {
  const canvasRef = useRef()

  useEffect(() => {
    const renderPDF = async () => {
      const url = "http://localhost:3000/test.pdf"
      const loadingTask = pdfjs.getDocument(url)
      const pdf = await loadingTask.promise
      const pageNumber = 1
      const page = await pdf.getPage(pageNumber)

      const viewport = page.getViewport({ scale: 1 })
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }
      await page.render(renderContext).promise
    }

    renderPDF()
  }, [])

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-auto"></canvas>
    </div>
  )
}

export default MyPage
