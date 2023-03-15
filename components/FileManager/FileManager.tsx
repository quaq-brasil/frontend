import { FileEntry, FileProps } from "components/FileEntryBlock/FileEntry"

type FileManagerProps = {
  files: FileProps[]
  onFileChange?: ({ file, name }: FileProps) => void
  onFileDelete?: (index: number) => void
}

export const FileManager = ({ files, onFileChange }: FileManagerProps) => {
  return (
    <div className="flex gap-4">
      <FileEntry onFileChange={onFileChange} />
      {files &&
        files.map((file, index) => (
          <button key={index}>
            <FileEntry file={file.file} name={file.name} />
          </button>
        ))}
    </div>
  )
}
