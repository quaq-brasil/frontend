type TabBarProps = {
  tags: React.ReactNode[];
  isHidden?: boolean;
};

export const TabBar = (props: TabBarProps) => {
  return (
    <div
      className={`flex justify-center w-full h-[74px] bg-gradient-to-t from-slate-200
        fixed bottom-0 z-30 md:left-0 ${props.isHidden ? "hidden" : ""}
        xl:bg-gradient-to-r xl:w-fit xl:py-[43px] xl:pl-[34px] xl:h-screen xl:justify-start
         `}
    >
      <div
        className={`flex flex-row scrollbar-hide items-center gap-2 ${
          props.tags.length === 1 ? "justify-end" : "justify-between"
        } overflow-x-auto px-[16px] xl:flex-col xl:justify-start
      xl:items-start xl:gap-3 xl:px-0 w-full xl:overflow-hidden`}
      >
        {props.tags}
      </div>
    </div>
  );
};
