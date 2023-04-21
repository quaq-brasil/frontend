import dynamic from "next/dynamic"

const PDFView = dynamic(
  () => import("components/Test").then((mod) => mod.default),
  { ssr: false }
)

const PdfPage = () => {
  return <PDFView />
}

export default PdfPage
