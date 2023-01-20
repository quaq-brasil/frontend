import useTranslation from "next-translate/useTranslation"
import { SpinnerGap, UploadSimple } from "phosphor-react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { checkForFileSize } from "../../utils/checkForFileSize"

export type FileProps = {
  name: string
  file: File
}

type FileEntryProps = {
  file?: File
  name?: string
  onFileChange?: ({ file, name }: FileProps) => void
}

export default function FileEntry({ onFileChange }: FileEntryProps) {
  const text = useTranslation().t
  const [file, setFile] = useState<string | undefined>()
  const [fileName, setFileName] = useState<string | undefined>()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = (files: File[]) => {
    setIsLoading(true)
    setError("")

    try {
      const file = files[0]

      console.log(file)

      if (!checkForFileSize(file)) {
        setError(text("imageselector:invalid_file_size"))
      }

      let fileUrl = URL.createObjectURL(file)

      if (!fileUrl) {
        throw new Error("Failed to create image URL")
      }

      setFile(fileUrl)
      setFileName(file.name)
      onFileChange && onFileChange({ file, name: file.name })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(false)
    setError("")
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="relative px-3" {...getRootProps()}>
      <input {...getInputProps()} type="file" />
      <button className="h-[2.5rem] px-[0.625rem] lg:h-[3.25rem] my-2 lg:px-3 lg:text-[1.1rem] flex items-center shrink-0 gap-2 py-1 rounded-full outline outline-1 outline-slate-100 bg-white ">
        {!isLoading ? (
          <UploadSimple weight="bold" className="h-5 w-5 shrink-0" />
        ) : (
          <SpinnerGap weight="bold" className="h-5 w-5 animate-spin" />
        )}

        {file ? (
          <p className="line-clamp-1 w-full overflow-hidden">{fileName}</p>
        ) : (
          <p>{text("fileentryblock:upload")}</p>
        )}
      </button>

      {error ? <p className="text-red-500 ">{error}</p> : null}
    </div>
  )
}
