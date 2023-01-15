import { action } from "../CardProps";

type CardActtltTxtProps = {
  title: action;
  text: string;
};

export function CardActtltTxt(props: CardActtltTxtProps) {
  return (
    <div className="pb-3">
      <div className="pb-3 lg:pb-5">
        <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
          {props.title.label && (
            <p className="lg:text-[1.25rem]">{props.title.label}</p>
          )}

          {props["title"].indicator && (
            <button onClick={() => props.title.onClick()}>
              <>
                <props.title.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              </>
            </button>
          )}
        </div>
      </div>
      <div className="px-3 flex flex-col lg:px-[1.125rem]">
        <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
        <p className="pb-3 lg:text-[1.25rem] lg:pb-[1.125rem] lg:pt-2 text-slate-300">
          {props.text}
        </p>
        <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
      </div>
    </div>
  );
}
