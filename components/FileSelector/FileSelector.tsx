import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { ArrowsClockwise, Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useCreateFile } from "services/hooks/useFile/useCreateFile"
import { checkForFileSize } from "utils/checkForFileSize"
import { LoadingImage } from "./LoadingImage"

const Image = dynamic(() => import("next/image").then((mod) => mod.default))

type FileSelectorProps = {
  url?: string
  onImageChange?: (url: string) => void
}

function checkForCorrectFileType(file: File): boolean {
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "application/pdf",
  ]
  return allowedFileTypes.includes(file.type)
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <div>{message}</div>
}

export function FileSelector({ url, onImageChange }: FileSelectorProps) {
  const [fileUrl, setFileUrl] = useState(url || "")
  const [fileName, setFileName] = useState("")
  const [fileType, setFileType] = useState("")
  const [error, setError] = useState("")
  const text = useTranslation().t
  const [isLoading, setIsLoading] = useState(false)
  const createFile = useCreateFile()

  useEffect(() => {
    setFileUrl(url || "")
  }, [url])

  const onDrop = async (acceptedFiles: File[]) => {
    setIsLoading(true)
    setError("")
    try {
      const file = acceptedFiles[0]
      setFileName(file.name)
      setFileType(file.type)
      if (!checkForCorrectFileType(file)) {
        setError(text("imageselector:invalid_file_type"))
      }

      if (file.size && !checkForFileSize(file)) {
        setError(text("imageselector:invalid_file_size"))
      }

      if (file.type === "image/heic") {
        const { convertHeicToJpeg } = await import("utils/convertHeicToJpeg")
        const jpegImage = await convertHeicToJpeg(file)

        if (typeof jpegImage !== "string") {
          createFile.mutate(jpegImage, {
            onSuccess: (data) => {
              setFileUrl(data.fileUrl)
              onImageChange && onImageChange(data.fileUrl)
            },
          })
        } else {
          setError(jpegImage)
        }
      } else {
        createFile.mutate(file, {
          onSuccess: (data) => {
            setFileUrl(data.fileUrl)
            onImageChange && onImageChange(data.fileUrl)
          },
        })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(false)
    setError("")
  }, [fileUrl])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  let content = null
  if (isLoading) {
    content = (
      <div className="w-fit relative" {...getRootProps()}>
        <input {...getInputProps()} />
        <LoadingImage />
      </div>
    )
  } else if (error) {
    content = <ErrorMessage message={error} />
  } else {
    content = (
      <div className="relative w-fit" {...getRootProps()}>
        <input {...getInputProps()} />
        {fileUrl ? (
          fileType.includes("image") ? (
            <Image
              src={fileUrl}
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-full object-cover border-[1px] border-black lg:border-[2px]"
              width={85}
              height={85}
              alt="Selected Image"
              loading="lazy"
            />
          ) : (
            <Tag
              variant="txt-icn"
              text={fileName}
              icon={ArrowsClockwise}
              onClick={() => {
                setFileUrl("")
                setFileName("")
                setFileType("")
              }}
            ></Tag>
          )
        ) : (
          <button
            type="button"
            className="flex items-center bg-white border-[1px] border-slate-100 rounded-full px-3 py-2 gap-2 lg:h-[3.25rem] lg:px-3 lg:text-[1.1rem]"
          >
            <Plus className="h-5 w-5" weight="bold" />
            <span>{text("imageselector:add")}</span>
          </button>
        )}
      </div>
    )
  }

  return <div className="relative">{content}</div>
}
