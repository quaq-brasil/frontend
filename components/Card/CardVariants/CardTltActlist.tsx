import { action } from "../CardProps";

type CardTltActlistProps = {
  title: string;
  actionList: action[];
};

export function CardTltActlist(props: CardTltActlistProps) {
  return (
    <div>
      <p className="p-3 lg:text-[1.25rem] lg:p-[1.125rem]">{props["title"]}</p>
      <div className="pb-3">
        {props.actionList &&
          props.actionList.map((action, index) => {
            return (
              <div
                key={index}
                className="flex flex-col pr-2 pl-2 lg:pr-[1.375rem] lg:pl-[1.125rem]"
              >
                {(action.options?.length != undefined && (
                  <div className="pb-3">
                    <div className="block mt-4 shrink-0 pb-1">
                      <select
                        className="w-full lg:text-[1.25rem] bg-white rounded-none focus:outline-none"
                        onChange={(e) => action.onChange(e.target.value)}
                      >
                        {action.options?.map((option, index) => (
                          <option value={option} key={index}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )) || (
                  <div className="pb-3 px-3 lg:px-[1.125rem]">
                    <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
                      {action.label && (
                        <p className="lg:text-[1.25rem]">{action.label}</p>
                      )}

                      {action.indicator && (
                        <button onClick={() => action.onClick()}>
                          <>
                            <action.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
                          </>
                        </button>
                      )}
                    </div>
                  </div>
                )}
                <span className="w-full p-[0.5px] bg-slate-100"></span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
