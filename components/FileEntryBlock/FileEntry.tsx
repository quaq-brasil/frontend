import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import { checkForFileSize } from "utils/checkForFileSize"

const SpinnerGap = dynamic(() =>
  import("phosphor-react").then((mod) => mod.SpinnerGap)
)

const UploadSimple = dynamic(() =>
  import("phosphor-react").then((mod) => mod.UploadSimple)
)

export type FileProps = {
  name: string
  file: File
}

export type FileEntryProps = {
  file?: File
  name?: string
  onFileChange?: ({ file, name }: FileProps) => void
}

export function FileEntry({ onFileChange }: FileEntryProps) {
  const text = useTranslation().t
  const [file, setFile] = useState<string | undefined>()
  const [fileName, setFileName] = useState<string | undefined>()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = useCallback(
    (files: File[]) => {
      setIsLoading(true)
      setError("")

      try {
        const file = files[0]

        if (file.size && !checkForFileSize(file)) {
          setError(text("imageselector:invalid_file_size"))
        }

        const fileUrl = URL.createObjectURL(file)

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
    },
    [text, onFileChange]
  )

  useEffect(() => {
    setIsLoading(false)
    setError("")
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const inputProps = useMemo(
    () => ({ ...getInputProps(), type: "file" }),
    [getInputProps]
  )

  return (
    <div className="relative px-3" {...getRootProps()}>
      <input {...inputProps} />
      <button className="h-[2.5rem] px-[0.625rem] lg:h-[3.25rem] my-2 lg:px-3 lg:text-[1.1rem] flex items-center shrink-0 gap-2 py-1 rounded-full ring-1 ring-slate-100 bg-white ">
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
