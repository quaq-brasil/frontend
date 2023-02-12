import { IconProps } from "phosphor-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type CardTextProps = {
  label: string
  indicator?: {
    icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    text?: string
    isVisible?: boolean
    onClick?: () => void
  }
  onClick?: () => void
}

export function CardText(props: CardTextProps) {
  function handleClick() {
    if (props?.onClick) {
      props.onClick()
    }
  }

  return (
    <button
      className="flex flex-row justify-between items-center px-3 lg:px-[1.125rem] min-w-[100%]"
      onClick={() => handleClick()}
    >
      {props.label && (
        <p className="lg:text-[1.1rem] text-left">{props.label}</p>
      )}
      {props.indicator && (
        <>
          {props.indicator.icon &&
            (props.indicator.onClick ? (
              <props.indicator.icon
                onClick={props.indicator.onClick}
                className={`w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem]
             lg:h-[1.5625rem] ${props.indicator.isVisible ? "text-white" : ""}`}
              />
            ) : (
              <props.indicator.icon
                className={`w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem]
             lg:h-[1.5625rem] ${props.indicator.isVisible ? "text-white" : ""}`}
              />
            ))}
          {props.indicator.text && (
            <p
              className={`lg:text-[1.1rem] text-right m-[0.3125rem] line-clamp-2
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
