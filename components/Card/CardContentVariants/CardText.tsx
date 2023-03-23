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

type IndicatorProps = {
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  text?: string
  isVisible?: boolean
  onClick?: () => void
}

const Indicator: React.FC<IndicatorProps> = ({
  icon: Icon,
  text,
  isVisible,
  onClick,
}) => (
  <>
    {Icon && (
      <Icon
        onClick={onClick}
        className={`w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem] ${
          isVisible ? "text-white" : ""
        }`}
      />
    )}
    {text && (
      <p
        className={`lg:text-[1.1rem] text-right m-[0.3125rem] line-clamp-2 ${
          isVisible ? "text-white" : ""
        }`}
      >
        {text}
      </p>
    )}
  </>
)

export function CardText({ label, indicator, onClick }: CardTextProps) {
  return (
    <button
      className="flex flex-row justify-between items-center px-3 lg:px-[1.125rem] min-w-[100%]"
      onClick={onClick}
    >
      {label && <p className="lg:text-[1.1rem] text-left">{label}</p>}
      {indicator && <Indicator {...indicator} />}
    </button>
  )
}
