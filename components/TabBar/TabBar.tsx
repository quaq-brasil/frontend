import { ReactNode } from "react"

type TabBarProps = {
  tags: ReactNode[]
  isHidden?: boolean
  shiftLayoutOnXl?: boolean
}

export const TabBar = ({
  tags,
  isHidden,
  shiftLayoutOnXl = true,
}: TabBarProps) => {
  return (
    <div
      className={`flex justify-center w-full h-[74px] bg-gradient-to-t from-slate-200 bottom-0 
        fixed z-30 md:left-0 ${isHidden ? "xl:hidden" : ""}
        ${
          shiftLayoutOnXl
            ? "xl:bg-gradient-to-r xl:w-fit xl:py-[43px] xl:pl-[34px] xl:h-screen xl:justify-start"
            : "xl:bottom-4 xl:rounded-b-[30px] xl:h-[84px]"
        } 
         `}
    >
      <div
        className={`flex flex-row scrollbar-hide items-center gap-2 ${
          tags.length === 1 ? "justify-end" : "justify-between"
        } overflow-x-auto px-[16px] w-full 
      ${
        shiftLayoutOnXl
          ? "xl:items-start xl:gap-3 xl:px-0  xl:overflow-hidden xl:flex-col xl:justify-start  xl:min-h-screen"
          : ""
      }`}
      >
        {tags}
      </div>
    </div>
  )
}
