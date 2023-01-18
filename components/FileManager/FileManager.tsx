import FileEntryBlock, { FileProps } from "../FileEntryBlock/FileEntryBlock";

type FileManagerProps = {
  files: FileProps[];
  onFileChange?: ({ file, name }: FileProps) => void;
  onFileDelete?: (index: number) => void;
};

export const FileManager = ({ files, onFileChange }: FileManagerProps) => {
  return (
    <div className="flex gap-4">
      <FileEntryBlock onFileChange={onFileChange} />
      {files &&
        files.map((file, index) => (
          <button key={index}>
            <FileEntryBlock file={file.file} name={file.name} />
          </button>
        ))}
    </div>
  );
};
