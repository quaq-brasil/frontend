import FileEntryBlock, { FileProps } from "../FileEntryBlock/FileEntryBlock";

type FileManagerProps = {
  files: FileProps[];
  onFileChange?: ({ file, name }: FileProps) => void;
};

export const FileManager = ({ files, onFileChange }: FileManagerProps) => {
  return (
    <div className="flex gap-4">
      {files &&
        files.map((file, index) => (
          <FileEntryBlock key={index} file={file.file} name={file.name} />
        ))}
      <FileEntryBlock onFileChange={onFileChange} />
    </div>
  );
};
