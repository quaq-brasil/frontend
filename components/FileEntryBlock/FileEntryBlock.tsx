import useTranslation from "next-translate/useTranslation";
import { SpinnerGap, UploadSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { checkForFileSize } from "../../utils/checkForFileSize";

export type FileProps = {
  name: string;
  file: File;
};

type FileEntryBlockProps = {
  file?: File;
  name?: string;
  onFileChange?: ({ file, name }: FileProps) => void;
};

export default function FileEntryBlock({ onFileChange }: FileEntryBlockProps) {
  const text = useTranslation().t;
  const [file, setFile] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (files: File[]) => {
    setIsLoading(true);
    setError("");

    try {
      const file = files[0];

      console.log(file);

      if (!checkForFileSize(file)) {
        setError(text("imageselector:invalid_file_size"));
      }

      let fileUrl = URL.createObjectURL(file);

      if (!fileUrl) {
        throw new Error("Failed to create image URL");
      }

      setFile(fileUrl);
      setFileName(file.name);
      onFileChange && onFileChange({ file, name: file.name });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setError("");
  }, [file]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="relative" {...getRootProps()}>
      <input {...getInputProps()} type="file" />
      <button className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-200 bg-white ">
        {!isLoading ? (
          <UploadSimple weight="bold" className="h-5 w-5" />
        ) : (
          <SpinnerGap weight="bold" className="h-5 w-5 animate-spin" />
        )}

        {file ? (
          <p className="text-[1rem] md:text-[1.125rem] line-clamp-1 w-full overflow-hidden">
            {fileName}
          </p>
        ) : (
          <p className="text-[1rem] md:text-[1.125rem]">
            {text("fileentryblock:upload")}
          </p>
        )}
      </button>

      {error ? <p className="text-red-500 ">{error}</p> : null}
    </div>
  );
}
