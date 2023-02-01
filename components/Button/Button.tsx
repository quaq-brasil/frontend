import { PencilSimple } from "phosphor-react"

type ButtonProps = {
  text: string
  onClick: () => void
  color: string
  isEditable?: boolean
}

export function Button(props: ButtonProps) {
  return (
    <div className="w-full h-fit relative">
      {props.isEditable === true && (
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <button
        onClick={props.onClick}
        className={`flex relative justify-between items-center 
        p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
        rounded-[20px] lg:rounded-[30px] bg-${props.color}`}
      >
        <span
          className={`lg:text-[1.1rem] ${
            props.color == "white" ? "text-black" : "text-white"
          } font-semibold text-center w-full`}
        >
          {props.text}
        </span>
      </button>
    </div>
  )
}
