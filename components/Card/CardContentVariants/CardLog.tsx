import Image from "next/image";
import { IconProps } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type CardLogProps = {
  img_url: string;
  name: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  date: string;
  method?: string;
};

export function CardLog(props: CardLogProps) {
  return (
    <div className="flex flex-row justify-between items-center bg-white my-2 px-3 lg:px-[1.125rem]">
      <div className="flex flex-row gap-2">
        <div>
          <Image
            className="h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem] shrink-0"
            src={props.img_url}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-[0.875rem] lg:text-[1.1rem]">{props.name}</p>

          <p className="text-[0.75rem] lg:text-[0.875rem] text-slate-500">
            {props.date}
          </p>
        </div>
      </div>
      <div>
        {props.icon && (
          <props.icon
            className={`w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem]
             lg:h-[1.5625rem]`}
          />
        )}
        {props.method && (
          <p className="text-[0.875rem] lg:text-[1.1rem]">{props.method}</p>
        )}
      </div>
    </div>
  );
}
