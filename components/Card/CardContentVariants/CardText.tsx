import { IconProps } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type CardTextProps = {
  label: string;
  indicator?: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    onClick: () => void;
    isVisible?: boolean;
  };
};

export function CardText(props: CardTextProps) {
  return (
    <button
      className="flex flex-row justify-between items-center px-3 lg:px-[1.125rem]"
      onClick={() => props?.indicator?.onClick()}
    >
      {props.label && (
        <p className="lg:text-[1.1rem] text-left">{props.label}</p>
      )}
      {props.indicator && (
        <>
          <props.indicator.icon
            className={`w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem]
             lg:h-[1.5625rem] ${props.indicator.isVisible ? "text-white" : ""}`}
          />
        </>
      )}
    </button>
  );
}
