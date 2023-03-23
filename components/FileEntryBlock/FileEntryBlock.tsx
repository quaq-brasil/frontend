import dynamic from "next/dynamic"
import { FileEntry } from "./FileEntry"

const PencilSimple = dynamic(() =>
  import("phosphor-react").then((mod) => mod.PencilSimple)
)

type FileEntryBlockProps = {
  isEditable: boolean
  updateFunc?: (currentValue: number) => void
}

export const FileEntryBlock = ({
  isEditable,
  updateFunc,
}: FileEntryBlockProps) => {
  return (
    <div className="flex relative w-full justify-end items-center">
      {isEditable && (
        <div className="z-10 absolute flex justify-start items-center rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-4 h-4 mx-1 lg:w-5 lg:h-5" />
        </div>
      )}
      <div
        className="flex justify-between items-center
            w-full bg-white 
            p-3 rounded-lg lg:rounded-xl"
      >
        <FileEntry />
      </div>
    </div>
  )
}
