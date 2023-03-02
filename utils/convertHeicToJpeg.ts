import heic2any from "heic2any"

export const convertHeicToJpeg = async (file: Blob): Promise<File | string> => {
  try {
    if (file.type !== "image/heic") {
      throw new Error("Invalid file type, not a HEIC image")
    }

    const result = await heic2any({ blob: file, toType: "image/jpeg" })
    const fileName =
      file.name.substring(0, file.name.lastIndexOf(".")) + ".jpeg"
    const imageJpeg = new File([result] as any, fileName, {
      type: "image/jpeg",
      lastModified: new Date().getTime(),
    })

    return imageJpeg
  } catch (error: any) {
    console.error(error)
    return error.message
  }
}
