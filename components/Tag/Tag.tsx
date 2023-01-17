import Image from "next/image";
import { IconProps } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TagProps =
  | {
      text: string;
      variant: "txt";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      text: string;
      img_url: string;
      variant: "txt-img";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      text: string;
      img_url: string;
      variant: "img-txt";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      img_url: string;
      variant: "img";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      text: string;
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
      variant: "txt-icn";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      text: string;
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
      variant: "icn-txt";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      text: string;
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
      variant: "icn-txt-xl";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    }
  | {
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
      variant: "icn";
      isSelected?: boolean;
      onClick?: () => void;
      isSeparated?: boolean;
    };

export const Tag = (props: TagProps) => {
  function handleClick() {
    props.onClick && props.onClick();
  }

  return (
    <button className="rounded-full shrink-0" onClick={handleClick}>
      <div
        className={`shrink-0 rounded-full lg:hover:bg-slate-300 ${
          props.isSelected ? "bg-slate-900 text-white" : "bg-white text-black"
        }
        ${props.isSeparated ? "lg:mt-3" : ""}
        `}
      >
        <>
          {props.variant === "txt" && (
            <p className="flex row justify-center content-center items-center gap-[0.625rem] h-[2.5rem] px-[0.625rem] lg:h-[3.25rem] lg:px-3 lg:text-[1.1rem]">
              {props.text}
            </p>
          )}
          {props.variant === "txt-img" && (
            <div className="flex row shrink-0 justify-center content-center items-center gap-[0.5rem] h-[2.5rem] pr-[0.125rem] pl-[0.625rem] lg:h-[3.25rem] lg:pr-[0.1875rem] lg:pl-[0.75rem] lg:gap-[0.75rem]">
              <p className="lg:text-[1.1rem]">{props.text}</p>
              <Image
                className="h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem] shrink-0"
                src={props.img_url}
                width={100}
                height={100}
                alt=""
              />
            </div>
          )}
          {props.variant === "img-txt" && (
            <div className="flex row shrink-0 justify-center content-center items-center gap-[0.5rem] h-[2.5rem] pr-[0.625rem] pl-[0.125rem] lg:h-[3.25rem] lg:pr-[0.75rem] lg:pl-[0.1875rem] lg:gap-[0.75rem]">
              <Image
                className="h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem] shrink-0"
                src={props.img_url}
                width={100}
                height={100}
                alt=""
              />
              <p className="lg:text-[1.1rem]">{props.text}</p>
            </div>
          )}
          {props.variant === "img" && (
            <div className="flex row shrink-0 justify-center content-center items-center h-[2.5rem] pr-[0.125rem] pl-[0.125rem] lg:h-[3.25rem] lg:pr-[0.1875rem] lg:pl-[0.1875rem]">
              <Image
                className="h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem]"
                src={props.img_url}
                width={100}
                height={100}
                alt=""
              />
            </div>
          )}
          {props.variant === "txt-icn" && (
            <div className="flex row gap-[0.625rem] content-center justify-center items-center h-[2.5rem] px-[0.625rem] lg:text-[1.1rem] lg:px-3 lg:h-[3.25rem]">
              <p className="lg:text-[1.1rem]">{props.text}</p>
              <>
                <props.icon className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              </>
            </div>
          )}
          {props.variant === "icn-txt" && (
            <div className="flex row gap-[0.625rem] content-center justify-center items-center h-[2.5rem] px-[0.625rem] lg:text-[1.1rem] lg:px-3 lg:h-[3.25rem]">
              <>
                <props.icon className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              </>
              <p className="lg:text-[1.1rem]">{props.text}</p>
            </div>
          )}
          {props.variant === "icn-txt-xl" && (
            <div className="flex row gap-[0.625rem] content-center justify-start items-center h-[2.5rem] px-[0.625rem] lg:text-[1.1rem] lg:px-3 lg:h-[3.25rem]">
              <>
                <props.icon className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              </>
              <p className="lg:text-[1.1rem]">{props.text}</p>
            </div>
          )}
          {props.variant === "icn" && (
            <div className="h-[2.875rem] w-[2.875rem] flex before:content-center justify-center items-center lg:h-[3.25rem] lg:w-[3.25rem]">
              {
                <div className="">
                  <props.icon className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
                </div>
              }
            </div>
          )}
        </>
      </div>
    </button>
  );
};
