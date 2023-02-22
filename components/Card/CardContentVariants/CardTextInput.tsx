import { IconProps } from "phosphor-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { useValidation } from "../../../hooks/useValidation"

type CardTextInputProps = {
  input?: {
    onChange: (value: string) => void
    type?: "name" | "email" | "password" | "text"
    label?: string
    fixedText?: string
    defaultValue?: string
    value?: string
    inputValue?: string
    setValid?: () => void
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
  const { errors, validateField, validators } = useValidation()

  const handleOnChange = (value: string) => {
    const requiredValidators = []

    if (props.input?.type == "name") {
      requiredValidators.push(validators.name)
    } else if (props.input?.type == "email") {
      requiredValidators.push(validators.email)
    } else if (props.input?.type == "password") {
      requiredValidators.push(validators.password)
    }

    validateField(value, [validators.required, ...requiredValidators])
    props.input?.onChange && props.input.onChange(value)
    if (!errors) {
      props.input?.setValid && props.input.setValid()
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center bg-slate-50 my-2">
        {props.input?.fixedText && (
          <p className="lg:text-[1.1rem] px-3 lg:px-[1.125rem] font-semibold inline text-left shrink-0">
            {props.input.fixedText}
          </p>
        )}

        {props.input && !props.input.value && (
          <input
            onChange={(e) =>
              props.input?.type
                ? handleOnChange(e.target.value)
                : props.input?.onChange(e.target.value)
            }
            className={`bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem]
        placeholder:text-slate-300 lg:text-[1.1rem] hover:outline-none focus:outline-none
          ${
            props.input.fixedText
              ? "ml-[-12px] lg:ml-[-18px]"
              : "px-3 lg:px-[1.125rem]"
          }`}
            type={props.input.type || "text"}
            placeholder={props.input.label}
            value={props.input.inputValue || props.input.defaultValue}
          />
        )}

        {props.dropdown && (
          <select
            onChange={(event) => props.dropdown?.onChange?.(event.target.value)}
            className="w-full h-12 lg:h-[3.375rem] pl-2 bg-slate-50
        lg:pl-[1.125rem] lg:mr-[2.25rem] hover:outline-none focus:outline-none"
          >
            {props.dropdown.options.map((option) => (
              <option key={option.value} value={option.value}>
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
      {errors &&
        errors.length > 0 &&
        errors.map((error) => {
          return (
            <p
              key={error}
              className="w-full text-center text-red-500 lg:text-[1.1rem]"
            >
              {error}
            </p>
          )
        })}
    </>
  )
}
