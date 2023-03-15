import { PencilSimple } from "phosphor-react"
import { FileEntry } from "./FileEntry"

type FileEntryBlockProps = {
  isEditable: boolean
  updateFunc?: (currenValue: number) => void
}

export const FileEntryBlock = (props: FileEntryBlockProps) => {
  return (
    <div className="flex relative min-w-[100%] justify-end content-center">
      {props.isEditable && (
        <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <div
        className="flex justify-between items-center
            min-w-[100%] bg-white 
            p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <FileEntry />
      </div>
    </div>
  )
}
