import { Eye, PencilSimple } from "phosphor-react";
import { Tag } from "../Tag/Tag";

type files = {
  title: string;
  url: string;
  onClick: (url: string) => void;
}

type FileSharingblockProps = {
  files: files[];
  isEditable: boolean;
}

export function FileSharingblock(props: FileSharingblockProps) {
  return (
    <div className="flex relative w-[23.375rem] justify-between items-center bg-white 
    py-[1.25rem] rounded-[20px] lg:w-[35.25rem]">
      {(props.isEditable === true) &&
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/>
        </div>
      }
      <div className="w-full">
        <div className="flex flex-row justify-between overflow-x-auto scrollbar-hide pr-3">
          {props.files.map((file, index) => (
            <button className="ml-3 shrink-0 rounded-full border border-slate-200 border-spacing-2" 
              key={index} onClick={() => file.onClick(file.url)}>
              <Tag variant="icn-txt" text={file.title} icon={Eye}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}