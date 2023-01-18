export function checkForFileSize(file: File): boolean {
  return file.size <= Number(process.env.MAX_FILE_SIZE);
}
