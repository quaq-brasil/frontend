import { action } from "../CardProps";

type CardActtltInProps = {
  title: action;
  input: action;
};

export function CardActtltIn(props: CardActtltInProps) {
  return (
    <div className="pb-5">
      <div className="pb-3">
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

      <div className="flex flex-row justify-between items-center bg-slate-50">
        <input
          onChange={(e) => props.input.onChange(e.target.value)}
          className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
            placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none"
          type="text"
          placeholder={props["input"].label}
        />

        <div className="flex justify-end items-end">
          <button
            onClick={() => props.input.onClick()}
            className={`z-10 flex rounded-full
                mr-3 lg:mr-[1.125rem] border border-slate-100 
                ${
                  props.input.indicatorColor
                    ? `text-white bg-${props.input.indicatorColor}`
                    : "bg-white"
                } `}
          >
            {props["input"].indicator && (
              <>
                <props.input.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
              </>
            )}
          </button>

          {props["input"].textIndicator && (
            <p>{props["input"].textIndicator}</p>
          )}
        </div>
      </div>
    </div>
  );
}
