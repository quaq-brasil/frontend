import { IconProps } from "phosphor-react"
import React, { ForwardRefExoticComponent, RefAttributes } from "react"

type CardTextInputProps = {
  input?: {
    onChange?: (value: string) => void
    type?: "name" | "email" | "password" | "text" | "title" | "number"
    label?: string
    fixedText?: string
    defaultValue?: string
    value?: string
    errors?: string[] | null
  }
  indicator?: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    bgColor?: string
    onClick?: () => void
  }
  dropdown?: {
    options: DropdownOptions[]
    onChange: (value: string) => void
    value?: string
  }
}

type DropdownOptions = {
  value: string
  title: string
}

const TextInput: React.FC<{
  fixedText?: string
  type?: string
  label?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
}> = ({ fixedText, type, label, value, onChange, defaultValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="flex flex-col w-full">
      <input
        onChange={handleChange}
        className={`bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem]
          placeholder:text-slate-300 lg:text-[1.1rem] hover:outline-none focus:outline-none
          ${fixedText ? "ml-[-8px] lg:ml-[-12px]" : "px-3 lg:px-[1.125rem]"}`}
        type={type || "text"}
        placeholder={label}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export function CardTextInput(props: CardTextInputProps) {
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-slate-50 my-2">
        {props.input?.fixedText && (
          <p className="lg:text-[1.1rem] px-3 lg:pl-[1.125rem] font-semibold inline text-left">
            {props.input.fixedText}
          </p>
        )}

        {props.input && (
          <TextInput
            fixedText={props.input.fixedText}
            type={props.input.type}
            label={props.input.label}
            value={props.input.value}
            defaultValue={props.input.defaultValue}
            onChange={props.input.onChange}
          />
        )}

        {props.dropdown && (
          <select
            onChange={(event) => props.dropdown?.onChange?.(event.target.value)}
            value={props.dropdown.value}
            className="w-full h-12 lg:h-[3.375rem] pl-2 bg-slate-50 lg:text-[1.1rem]
              lg:pl-[1.125rem] lg:mr-[2.25rem] hover:outline-none focus:outline-none"
          >
            {props.dropdown.options.map((option) => (
              <option
                className="lg:text-[1.1rem]"
                key={option.value}
                value={option.value}
              >
                {option.title}
              </option>
            ))}
          </select>
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
      {props.input.errors &&
        props.input.errors.length > 0 &&
        props.input.errors.map((error) => (
          <p
            key={error}
            className="text-red-500 lg:text-[1.1rem] px-3 lg:pl-[1.125rem] text-left"
          >
            {error}
          </p>
        ))}
    </>
  )
}
