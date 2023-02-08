import Image from "next/image"
import { IconProps } from "phosphor-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type TagProps =
  | {
      text: string
      variant: "txt"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      text: string
      img_url: string
      variant: "txt-img"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      text: string
      img_url: string
      variant: "img-txt"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      img_url: string
      variant: "img"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      text: string
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
      variant: "txt-icn"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      text: string
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
      variant: "icn-txt"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      text: string
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
      variant: "icn-txt-xl"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }
  | {
      icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
      variant: "icn"
      isSelected?: boolean
      onClick?: () => void
      isSeparated?: boolean
      hasOutline?: boolean
    }

export const Tag = (props: TagProps) => {
  function handleClick() {
    props.onClick && props.onClick()
  }

  return (
    <button className="rounded-full shrink-0" onClick={handleClick}>
      <div
        className={`shrink-0 rounded-full lg:hover:bg-slate-300 ${
          props.isSelected ? "bg-slate-900 text-white" : "bg-white text-black"
        }
        ${props.isSeparated ? "lg:mt-3" : ""}
        ${props.hasOutline ? "outline outline-1 outline-slate-100" : ""}
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
              {props.text ? (
                <p className="lg:text-[1.1rem]">{props.text}</p>
              ) : (
                <>
                  <p className="h-4 bg-slate-400 rounded col-span-1 w-16" />
                </>
              )}
              <ImageTag img_url={props.img_url} />
            </div>
          )}
          {props.variant === "img-txt" && (
            <div className="flex row shrink-0 justify-center content-center items-center gap-[0.5rem] h-[2.5rem] pr-[0.625rem] pl-[0.125rem] lg:h-[3.25rem] lg:pr-[0.75rem] lg:pl-[0.1875rem] lg:gap-[0.75rem]">
              <ImageTag img_url={props.img_url} />

              {props.text ? (
                <p className="lg:text-[1.1rem]">{props.text}</p>
              ) : (
                <>
                  <p className="h-4 bg-slate-400 rounded col-span-1 w-16" />
                </>
              )}
            </div>
          )}
          {props.variant === "img" && (
            <div className="flex row shrink-0 justify-center content-center items-center h-[2.5rem] pr-[0.125rem] pl-[0.125rem] lg:h-[3.25rem] lg:pr-[0.1875rem] lg:pl-[0.1875rem]">
              <ImageTag img_url={props.img_url} />
            </div>
          )}
          {props.variant === "txt-icn" && (
            <div className="flex row shrink-0 gap-[0.625rem] content-center justify-center items-center h-[2.5rem] px-[0.625rem] lg:text-[1.1rem] lg:px-3 lg:h-[3.25rem]">
              {props.text ? (
                <p className="lg:text-[1.1rem]">{props.text}</p>
              ) : (
                <>
                  <p className="h-4 bg-slate-400 rounded col-span-1 w-16" />
                </>
              )}
              <>
                <props.icon
                  weight="bold"
                  className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"
                />
              </>
            </div>
          )}
          {props.variant === "icn-txt" && (
            <div className="flex row shrink-0 gap-[0.625rem] content-center justify-center items-center h-[2.5rem] px-[0.625rem] lg:text-[1.1rem] lg:px-3 lg:h-[3.25rem]">
              <>
                <props.icon
                  weight="bold"
                  className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"
                />
              </>
              {props.text ? (
                <p className="lg:text-[1.1rem]">{props.text}</p>
              ) : (
                <>
                  <p className="h-4 bg-slate-400 rounded col-span-1 w-16" />
                </>
              )}
            </div>
          )}
          {props.variant === "icn-txt-xl" && (
            <div className="flex row shrink-0 gap-[0.625rem] content-center justify-start items-center h-[2.5rem] px-[0.625rem] lg:text-[1.1rem] lg:px-3 lg:h-[3.25rem]">
              <>
                <props.icon
                  weight="bold"
                  className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"
                />
              </>
              {props.text ? (
                <p className="lg:text-[1.1rem]">{props.text}</p>
              ) : (
                <>
                  <p className="h-4 bg-slate-400 rounded col-span-1 w-16" />
                </>
              )}
            </div>
          )}
          {props.variant === "icn" && (
            <div className="h-[2.5rem] w-[2.5rem] flex shrink-0 justify-center items-center lg:h-[3.25rem] lg:w-[3.25rem]">
              {
                <div className="">
                  <props.icon
                    weight="bold"
                    className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"
                  />
                </div>
              }
            </div>
          )}
        </>
      </div>
    </button>
  )
}

type ImageTagProps = {
  img_url: string
}

const ImageTag = ({ img_url }: ImageTagProps) => {
  if (img_url) {
    return (
      <Image
        className="h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem] shrink-0 bg-slate-400"
        src={img_url}
        width={100}
        height={100}
        alt=""
      />
    )
  }

  return (
    <div className="h-[2.25rem] w-[2.25rem] rounded-full lg:h-[2.875rem] lg:w-[2.875rem] shrink-0 animate-pulse bg-slate-400" />
  )
}
