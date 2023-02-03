import { IconProps } from "phosphor-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type CardTextInputProps = {
  input?: {
    onChange: (value: string) => void
    type?: string
    label?: string
    fixedText?: string
    defaultValue?: string
    value?: string
  }
  indicator?: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    bgColor?: string
    onClick: () => void
  }
  dropdown?: {
    options: DropdownOptions[]
    onChange: (value: string) => void
  }
}

type DropdownOptions = {
  value: string
  title: string
}

export function CardTextInput(props: CardTextInputProps) {
  return (
    <div className="flex flex-row justify-between items-center bg-slate-50 my-2">
      {props.input?.fixedText && (
        <p className="lg:text-[1.1rem] px-3 lg:px-[1.125rem] font-semibold">
          {props.input.fixedText}
        </p>
      )}

      {props.input && !props.input.value && (
        <input
          onChange={(e) => props?.input?.onChange(e.target.value)}
          className={`bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem]
        placeholder:text-slate-300 lg:text-[1.1rem] hover:outline-none focus:outline-none
          ${
            props.input.fixedText
              ? "ml-[-12px] lg:ml-[-18px]"
              : "px-3 lg:px-[1.125rem]"
          }`}
          type={props.input.type || "text"}
          placeholder={props.input.label}
          defaultValue={props.input.defaultValue}
        />
      )}

      {props.dropdown && (
        <select
          onChange={(event) => props.dropdown?.onChange?.(event.target.value)}
          className="w-full h-12 lg:h-[3.375rem] pl-2 bg-slate-50
        lg:pl-[1.125rem] lg:mr-[2.25rem] hover:outline-none focus:outline-none"
        >
          {props.dropdown.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      )}

      {props.input?.value && (
        <div
          className={`bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem]
          flex items-center ml-[-12px] lg:ml-[-18px]`}
        >
          <p className="lg:text-[1.1rem]">{props.input.value}</p>
        </div>
      )}

      {props.indicator && (
        <div className="flex justify-end items-end">
          <button
            onClick={() => props?.indicator?.onClick()}
            className={`z-10 flex rounded-full
          mr-3 lg:mr-[1.125rem] border border-slate-100 
          ${
            props.indicator.bgColor
              ? `text-white bg-${props.indicator.bgColor}`
              : "bg-white"
          } `}
          >
            {props.indicator && (
              <>
                <props.indicator.icon className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
