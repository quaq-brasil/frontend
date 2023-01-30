import { IconProps } from "phosphor-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type CardTextProps = {
  label: string
  indicator?: {
    icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    text?: string
    onClick?: () => void
    isVisible?: boolean
  }
}

export function CardText(props: CardTextProps) {
  function handleClick() {
    if (props.indicator?.onClick) {
      props.indicator.onClick()
    }
  }

  return (
    <button
      className="flex flex-row justify-between items-center px-3 lg:px-[1.125rem]"
      onClick={() => handleClick()}
    >
      {props.label && (
        <p className="lg:text-[1.1rem] text-left">{props.label}</p>
      )}
      {props.indicator && (
        <>
          {props.indicator.icon && (
            <props.indicator.icon
              className={`w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem]
             lg:h-[1.5625rem] ${props.indicator.isVisible ? "text-white" : ""}`}
            />
          )}
          {props.indicator.text && (
            <p
              className={`lg:text-[1.1rem] text-left font-semibold m-[0.3125rem]
            ${props.indicator.isVisible ? "text-white" : ""}`}
            >
              {props.indicator.text}
            </p>
          )}
        </>
      )}
    </button>
  )
}
