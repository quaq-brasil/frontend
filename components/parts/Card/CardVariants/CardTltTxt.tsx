type CardTltTxtProps = {
  title: string;
  text: string;
};

export function CardTltTxt(props: CardTltTxtProps) {
  return (
    <div className="pb-3 px-3 flex flex-col lg:px-[1.125rem]">
      <p className="py-3 lg:text-[1.25rem] lg:py-[1.125rem]">
        {props["title"]}
      </p>
      <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
      <p className="pb-3 lg:text-[1.25rem] lg:pb-[1.125rem] lg:pt-2 text-slate-300">
        {props.text}
      </p>
      <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
    </div>
  );
}
