export function checkForFileSize(file: File): boolean {
  if (file?.size) {
    return file.size <= Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE)
  }

  return true
}
