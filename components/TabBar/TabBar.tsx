import { Tag, TagProps } from "../Tag/Tag"

type TabBarProps = {
  tags: TagProps[]
}

export const TabBar = (props: TabBarProps) => {
  return (
    <div className="flex justify-center w-full h-[74px] bg-gradient-to-t from-slate-200 
    lg:h-full lg:bg-gradient-to-r lg:w-[236px] lg:py-[43px] lg:pl-[34px] lg:justify-start">
      <div className="flex flex-row items-center gap-2 overflow-x-auto px-[16px] lg:flex-col 
      lg:items-start lg:gap-3 lg:px-0"> 
        {props.tags.map((tag, index) => (
          <Tag key={index} {...tag} />
        ))}
      </div>
    </div>
  )
}