import { Switch } from "@headlessui/react";
import { useState } from "react";

type CardSwitchProps = {
  text: string;
  onChange: (state: boolean) => void;
  showStatus?: boolean;
};

export function CardSwitch(props: CardSwitchProps) {
  const [enabled, setEnabled] = useState(false);

  function handleSwitch() {
    setEnabled(!enabled);
    props.onChange(!enabled);
  }

  return (
    <div className="flex justify-between items-center px-3 lg:px-[1.125rem]">
      <p className="lg:text-[1.1rem]">
        {props.text}
        {enabled ? " (on)" : " (off)"}
      </p>
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
  );
}
