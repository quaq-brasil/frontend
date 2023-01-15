import { Switch } from "@headlessui/react";
import { PencilSimple } from "phosphor-react";
import { useState } from "react";

type SwitchBlockProps = {
  text: string;
  isEditable: boolean;
  onSwitch: () => void;
};

export const SwitchBlock = (props: SwitchBlockProps) => {
  const [enabled, setEnabled] = useState(false);

  function handleSwitch() {
    setEnabled(!enabled);
    props.onSwitch();
  }

  return (
    <>
      {props.isEditable === false && (
        <>
          <div
            className="flex justify-between items-center
            w-[23.5rem] md:w-[35rem] lg:w-[45rem] bg-white 
            p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
          >
            <p className="lg:text-[1.25rem]">{props.text}</p>
            <div>
              <Switch
                checked={enabled}
                onChange={handleSwitch}
                className={`${enabled ? "bg-teal-400" : "bg-slate-500"}
                  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-9" : "translate-x-0"}
                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
        </>
      )}
      {props.isEditable === true && (
        <div className="flex relative justify-end content-center w-[23.5rem] md:w-[35rem] lg:w-[45rem]">
          <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
            <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
          </div>
          <div
            className="flex justify-between items-center
            w-[23.5rem] md:w-[35rem] lg:w-[45rem] bg-white 
            p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
          >
            <p className="lg:text-[1.25rem]">{props.text}</p>
            <div>
              <Switch
                checked={enabled}
                onChange={handleSwitch}
                className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
                  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-9" : "translate-x-0"}
                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
