import { Tag, TagProps } from "../Tag/Tag";

type TabBarProps = {
  tags: TagProps[];
  isHidden?: boolean;
};

export const TabBar = (props: TabBarProps) => {
  return (
    <div
      className={`flex justify-center w-full h-[74px] bg-gradient-to-t from-slate-200
        fixed bottom-0 z-30 md:left-0 ${props.isHidden ? "hidden" : ""}
        lg:bg-gradient-to-r lg:w-[14.75rem] lg:py-[43px] lg:pl-[34px] lg:h-screen lg:justify-start`}
    >
      <div
        className={`flex flex-row scrollbar-hide items-center gap-2 ${
          props.tags.length === 1 ? "justify-end" : "justify-between"
        } overflow-x-auto px-[16px] lg:flex-col lg:justify-start
      lg:items-start lg:gap-3 lg:px-0 w-full`}
      >
        {props.tags.map((tag, index) => (
          <Tag key={index} {...tag} />
        ))}
      </div>
    </div>
  );
};
