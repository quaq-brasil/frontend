import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import { ImageSquare, Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { checkForFileSize } from "../../utils/checkForFileSize"
import { LoadingImage } from "./LoadingImage"

type ImageSelectorProps = {
  url?: string
  onImageChange: (url: string) => void
}

function checkForCorrectFileType(file: File): boolean {
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
  ]
  return allowedFileTypes.includes(file.type)
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <div>{message}</div>
}

export function ImageSelector({ url, onImageChange }: ImageSelectorProps) {
  const [imageUrl, setImageUrl] = useState(url || "")
  const [error, setError] = useState("")
  const text = useTranslation().t
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setImageUrl(url || "")
  }, [url])

  const onDrop = async (acceptedFiles: File[]) => {
    setIsLoading(true)
    setError("")
    try {
      const file = acceptedFiles[0]
      if (!checkForCorrectFileType(file)) {
        setError(text("imageselector:invalid_file_type"))
      }
      if (!checkForFileSize(file)) {
        setError(text("imageselector:invalid_file_size"))
      }

      let imageUrl
      if (file.type === "image/heic") {
        const { convertHeicToJpeg } = await import(
          "../../utils/convertHeicToJpeg"
        )
        const jpegImage = await convertHeicToJpeg(file)

        if (typeof jpegImage !== "string") {
          imageUrl = URL.createObjectURL(jpegImage as any)
        } else {
          setError(jpegImage)
        }
      } else {
        imageUrl = URL.createObjectURL(file)
      }

      if (!imageUrl) {
        throw new Error("Failed to create image URL")
      }

      setImageUrl(imageUrl)
      onImageChange(imageUrl)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(false)
    setError("")
  }, [imageUrl])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="relative">
      {isLoading ? (
        <div className="w-fit">
          <div className="relative" {...getRootProps()}>
            <input {...getInputProps()} accept="image/" />
            <LoadingImage />
          </div>
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="relative w-fit" {...getRootProps()}>
          <input {...getInputProps()} accept="image/" />
          {imageUrl ? (
            <Image
              src={imageUrl}
              className="h-16 w-16  lg:h-20 lg:w-20 rounded-full object-cover border-[1px] border-black lg:border-[2px]"
              width={85}
              height={85}
              alt="Selected Image"
            />
          ) : (
            <button className="flex items-center bg-white border-[1px] border-slate-100 rounded-full px-3 py-2 gap-2 lg:h-[3.25rem] lg:px-3 lg:text-[1.1rem]">
              <Plus className="h-5 w-5" weight="bold" />
              <span>{text("imageselector:add")}</span>
            </button>
          )}

          {imageUrl ? (
            <div className="absolute bottom-0 right-0 bg-black flex justify-center items-center rounded-full h-5 w-5 lg:h-6 lg:w-6">
              <ImageSquare className="text-white w-3 h-3 lg:h-4 lg:w-4" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
