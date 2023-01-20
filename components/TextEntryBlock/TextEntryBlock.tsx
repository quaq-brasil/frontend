import { PencilSimple } from "phosphor-react"
import { TextEntry } from "./TextEntry"

type TextEntryBlockProps = {
  isEditable: boolean
  type: "number" | "text" | "long-text" | "email" | "password" | "url"
  updateFunc?: () => void
}

export const TextEntryBlock = (props: TextEntryBlockProps) => {
  return (
    <div className="flex relative min-w-[100%] justify-end content-center">
      {props.isEditable && (
        <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <div
        className="flex justify-between items-center
            min-w-[100%] bg-white py-[1.125rem] rounded-[20px] lg:rounded-[30px]"
      >
        <div className="w-full">
          <TextEntry type={props.type} />
        </div>
      </div>
    </div>
  )
}
