export default function Page() {
  return (
    <div>
      <div>
        <object
          data="https://quaq-image.s3.sa-east-1.amazonaws.com/books/Algorithms.pdf"
          type="application/pdf"
          className="w-full h-screen"
        >
          <p>
            Your browser does not support PDFs. Please download the PDF to view
            it:{" "}
            <a href="https://quaq-image.s3.sa-east-1.amazonaws.com/books/Algorithms.pdf">
              Download PDF
            </a>
            .
          </p>
        </object>
      </div>
    </div>
  )
}
