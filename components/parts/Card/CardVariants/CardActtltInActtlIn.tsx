import { action } from "../CardProps";

type CardActtltInActtlInProps = {
  title1: action;
  input1: action;
  title2: action;
  input2: action;
};

export function CardActtltInActtlIn(props: CardActtltInActtlInProps) {
  return (
    <div className="pb-5 min-w-[100%]">
      <div className="pb-3">
        <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
          {props.title1.label && (
            <p className="lg:text-[1.25rem]">{props.title1.label}</p>
          )}

          {props.title1.indicator && (
            <button onClick={() => props.title1.onClick()}>
              <>
                <props.title1.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              </>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center bg-slate-50">
        <input
          onChange={(e) => props.input1.onChange(e.target.value)}
          className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
            placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none"
          type="text"
          placeholder={props["input1"].label}
        />

        <div className="flex justify-end items-end">
          <button
            onClick={() => props.input1.onClick()}
            className={`z-10 flex rounded-full
                mr-3 lg:mr-[1.125rem] border border-slate-100 
                ${
                  props.input1.indicatorColor
                    ? `text-white bg-${props.input1.indicatorColor}`
                    : "bg-white"
                } `}
          >
            {props["input1"].indicator && (
              <>
                <props.input1.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
              </>
            )}
          </button>

          {props["input1"].textIndicator && (
            <p>{props["input1"].textIndicator}</p>
          )}
        </div>
      </div>

      {(props.title2.options?.length != undefined && (
        <div className="pb-3">
          <div className="block pl-2 pr-[0.75rem] mt-4 lg:pl-[1.125rem] shrink-0 pb-1 lg:pr-[1.5rem]">
            <select
              className="w-full lg:text-[1.25rem] bg-white rounded-none focus:outline-none"
              onChange={(e) => props.title2.onChange(e.target.value)}
            >
              {props.title2.options?.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )) || (
        <div className="pb-3">
          <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
            {props.title2.label && (
              <p className="lg:text-[1.25rem]">{props.title2.label}</p>
            )}

            {props["title2"].indicator && (
              <button onClick={() => props.title2.onClick()}>
                <>
                  <props.title2.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
                </>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-row justify-between items-center bg-slate-50 mb-2">
        <input
          onChange={(e) => props.input2.onChange(e.target.value)}
          className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
            placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none"
          type="text"
          placeholder={props["input2"].label}
        />

        <div className="flex justify-end items-end">
          <button
            onClick={() => props.input2.onClick()}
            className={`z-10 flex rounded-full
                mr-3 lg:mr-[1.125rem] border border-slate-100 
                ${
                  props.input2.indicatorColor
                    ? `text-white bg-${props.input2.indicatorColor}`
                    : "bg-white"
                } `}
          >
            {props["input2"].indicator && (
              <>
                <props.input2.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
              </>
            )}
          </button>

          {props["input2"].textIndicator && (
            <p>{props["input2"].textIndicator}</p>
          )}
        </div>
      </div>
    </div>
  );
}
