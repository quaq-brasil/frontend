import { IconProps } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type CardTextProps = {
  label: string;
  indicator?: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    onClick: () => void;
  };
};

export function CardText(props: CardTextProps) {
  return (
    <div className="flex flex-row justify-between items-center px-3 lg:px-[1.125rem]">
      {props.label && <p className="lg:text-[1.1rem]">{props.label}</p>}

      {props.indicator && (
        <button onClick={() => props?.indicator?.onClick()}>
          <>
            <props.indicator.icon className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
          </>
        </button>
      )}
    </div>
  );
}
